// 重構容易漏東漏西，做一點就要一直檢查

// const axios = require("axios"); 會用到axios的都搬去module，所以在此無需引用axios。
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();
const twse = require("./utils/twse");
const converter = require("./utils/converter");
const twseSaver = require("./utils/twseSaver");
const db = require("./utils/db");

(async () => {
  let connection = mysql.createConnection({
    host: process.env.DB_HOST, //127.0.0.1
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  try {
    // 從stock.txt撈stockNo。進階挑戰會是多個代碼進去
    // 根據變數去抓取資料
    let stockNo = await readFile("stock.txt", "utf-8");
    let stockNameData = await twse.queryStockName(stockNo);
    
    // input輸入推薦
    let stockName = converter.parseStockName(stockNameData);

    //  駭客攻擊 SQL injection：有非常多變形，最簡易的是禁止有''、""、``。
    // let saveNameResult = await connection.execute("INSERT INTO stocks (id, name) VALUES ()); 老師最開始有錯誤示範 沒抄到
    // prepared statement 預防SQL injection
    // 不能重複加同公司，IGNORE嚷我們可以重複測試
    let saveNameResult = await twseSaver.saveStockName(connection, stockNo, stockName);

    // console.log(saveNameResult);

    // let queryDate = "20220114";
    // 老師在此有看不同同學的解法，記得看影片補上！
    let queryDate = moment().format("YYYYMMDD");

    let priceData = await twse.queryStockPrice(queryDate, stockNo);
    // priceData是原本的response.data

    // 處理資料
    let processedData = converter.convertPrice(priceData, stockNo);
    console.log(processedData);

    // 把整理好的資料存進資料庫
    // 套件mysql2有個雷是，但又有支援Promise。套件mysql沒此雷，但不支援Promise。
    // connection.execute -> 處理bulk insert的prepare statement會有點小問題
    // connection.execute -> 回傳的是Promise，可以被await
    // connection.query -> 回傳的不是Promise，不能被await
    let savePriceResult = await twseSaver.savePriceResult(connection, processedData);

  } catch (err) {
    console.error(err);
  }
  connection.end();
})();
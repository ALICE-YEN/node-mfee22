const axios = require("axios");
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();

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
    let queryStockName = await axios.get(
      "https://www.twse.com.tw/zh/api/codeQuery",
      {
        params: {
          query: stockNo,
        },
      }
    );
    // console.log(queryStockName.date);

    // input輸入推薦
    if (
      !queryStockName.data.suggestions ||
      queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)"
    ) {
      throw new Error("查無此代表");
    }
     // 可以到這裡，表示有資料
    let stockData = queryStockName.data.suggestions[0];
    let stockDatas = stockData.split("\t");
    let stockName = stockDatas[1];

    //  駭客攻擊 SQL injection：有非常多變形，最簡易的是禁止有''、""、``。
    // let saveNameResult = await connection.execute("INSERT INTO stocks (id, name) VALUES ()); 老師最開始有錯誤示範 沒抄到
    // prepared statement 預防SQL injection
    // 不能重複加同公司，IGNORE嚷我們可以重複測試
    let saveNameResult = await connection.execute(
      "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
      [stockNo, stockName]
    );
    // console.log(saveNameResult);

    // let queryDate = "20220114";
    // 老師在此有看不同同學的解法，記得看影片補上！
    let queryDate = moment().format("YYYYMMDD");

    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        // 這裡可以放一些設定
        // params: 放 query string 的參數
        params: {
          response: "json",
          date: queryDate,
          stockNo, // 實務上可以存.env，不一定要另外存txt(不會誤改設定)
        },
      }
    );
    // 處理資料
    let processedData = response.data.data.map((d) => {
      // 處理日期：民國轉西元，/轉-
      let dateArr = d[0].split("/");
      dateArr[0] = Number(dateArr[0] + 1911);
      d[0] = dateArr.join("-");
      // 處理千分位
      d = d.map((value) => {
        return value.replace(/[,]+/g,"");
      });
      d.unshift(stockNo);
      return d;
    });
    console.log(processedData);

    // 把整理好的資料存進資料庫
    // 套件mysql2有個雷是，但又有支援Promise。套件mysql沒此雷，但不支援Promise。
    // connection.execute -> 處理bulk insert的prepare statement會有點小問題
    // connection.execute -> 回傳的是Promise，可以被await
    // connection.query -> 回傳的不是Promise，不能被await
    let savePriceResult = await connection.promise().query(
      "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?", [processedData]
    );
    console.log(savePriceResult);

  } catch (err) {
    console.error(err);
  }
  connection.end();
})();


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
    console.log(queryStockName.date);
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
    let saveNameResult = await connection.execute(
      "INSERT INTO stocks (id, name) VALUES (?, ?)",
      [stockNo, stockName]
    );
    console.log(saveNameResult);

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
          stockNo,
        },
      }
    );
    // console.log(response.data);
  } catch (err) {
    console.error(err);
  }
  connection.end();
})();


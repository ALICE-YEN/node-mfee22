const axios = require("axios");
const { readFile } = require("fs/promises");
const moment = require("moment");

(async () => {
  try {
    // 從stock.txt撈stockNo。進階挑戰會是多個代碼進去
    // 根據變數去抓取資料
    let stockNo = await readFile("stock.txt", "utf-8");
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    let queryStockName = await axios.get(
      "https://www.twse.com.tw/zh/api/codeQuery",
      {
        params: {
          query: stockNo,
        },
      }
    );
    console.log(queryStockName.data);
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

    // let queryDate = "20220114";
    // 老師在此有看不同同學的解法，記得看影片補上！
    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期

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
  } catch (e) {
    console.error(e);
  }
})();

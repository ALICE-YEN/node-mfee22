// async/await axios.get 證交所資料

const axios = require("axios");
const { readFile } = require("fs/promises"); //讀檔函示
const moment = require("moment"); //moment套件：自動用今天日期。

(async () => {
  try {
    // 從stock.txt撈stockNo。進階挑戰會是多個代碼進去
    // 根據變數去抓取資料
    let stockNo = await readFile("stock.txt", "utf-8");
    // let queryDate = "20220114";
    // 老師在此有看不同同學的解法，記得看影片補上！
    let queryDate = moment().format("YYYYMMDD") //moment套件：自動用今天日期。

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
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
})();

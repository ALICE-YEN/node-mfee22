// async/await axios.get 證交所資料

const axios = require("axios");
const { readFile } = require("fs/promises");

(async () => {
  try {
    // 從stock.txt撈stockNo
    (async() => {
        try {
            let result = await readFile("stock.txt", "utf-8");
            console.log(`${result}`);
        } catch (err) {
            console.log(err);
        }
    })();
    

    // 根據變數去抓取資料
    let stockNo = 2330;
    let queryDate = "20220114";

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

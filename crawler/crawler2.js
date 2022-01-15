// async/await axios.get 證交所資料

const axios = require("axios");

// (()=>{})(); 立即執行函示
(async () => {
  try {
    // 根據變數去抓取資料
    let stockNo = 2330;
    let queryDate = "20220114";

    // 第二種寫法
    // let response = await axios.get(
    //   `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${stockNo}&stockNo=${queryDate}`
    //   );
    
    // 第三種寫法：較複雜時較易維護
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

  // 第一種寫法：不建議這樣寫
  // "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=" + queryDate +"&stockNo=" + stockNo;
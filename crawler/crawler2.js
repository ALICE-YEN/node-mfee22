// async/await axios.get 證交所資料

const axios = require("axios");

(async () => {
  try {
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20200401&stockNo=0050"
    );
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
})();
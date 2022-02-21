// promise axios.get 證交所資料
// 先安裝npm i axios，後引用require

const axios = require("axios");

axios
  //   .get("http://34.221.173.92:3000/data")  // 老師的JSON
  .get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220104&stockNo=2330&_=1641716346705"
  )
  .then(function (response) {
    // console.log(response);
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
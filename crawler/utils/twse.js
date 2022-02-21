// 重構
const axios = require("axios");

// twse.js
async function queryStockName(stockNo) {
    let queryStockName = await axios.get(
        "https://www.twse.com.tw/zh/api/codeQuery",
        {
            params: {
                query: stockNo,
            },
        }
    );
    return queryStockName.data;
}

async function queryStockPrice(queryDate, stockNo) {
    let response = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
        {
          params: {
            response: "json",
            date: queryDate,
            stockNo,
          },
        }
      );
      return response.data;
}

module.exports = { queryStockName, queryStockPrice };
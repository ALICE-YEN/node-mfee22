// 重構
// 處理股票名稱
function parseStockName(stockNameData) {
    if (
        !stockNameData.suggestions ||
        stockNameData.suggestions[0] === "(無符合之代碼或名稱)"
      ) {
        throw new Error("查無此代表");
      }
      let stockData = stockNameData.suggestions[0];
      let stockDatas = stockData.split("\t");
      let stockName = stockDatas[1];
      return stockName;
}

// 處理價格資料
function convertPrice(priceData, stockNo) {
    // 處理資料
    let processedData = priceData.data.map((d) => {
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
      return processedData;
}

module.exports = { parseStockName, convertPrice };
// 讀檔用filesystem，內建的，無須安裝，但要引用
const fs = require("fs/promises");

// __dirname：nodejs提供特殊的變數。顯示程式碼所在的目錄(/Users/yanyixuan/Desktop/MFEE22/nodejs/node-mfee22/dirname/sub)，跟在哪裡執行無關。
console.log("first.js", __dirname);

fs.readFile("stock.txt", "utf-8").then((result) => {
  console.log(result);
});

// 複習2022.2.15
const fs = require("fs/promises");
const path = require("path");
// __dirname：程式碼所在的目錄
console.log("second.js", __dirname);

// "/Users/azole/Sites/MFEE22/node-mfee22/dirname/sub" + "/stock.txt";

// "/Users/azole/Sites/MFEE22/node-mfee22/dirname/sub/../stock.txt";
fs.readFile(__dirname + "/../stock.txt", "utf-8").then((result) => {
  console.log(result);
});

fs.readFile(path.join(__dirname, "..", "stock.txt"), "utf-8").then((result) => {
  console.log(result);
});

// 複習2022.2.15
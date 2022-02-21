// callback版(舊的)
const { readFile } = require("fs"); //用法下次講！

// readFile非同步函式，丟給外包
// 檔案名稱路徑、編碼、callback
readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    // insert to mysql，在這裡才會有外包公司的資料
});
// insert to mysql，外包公司還沒做完readFile，所以會讀不到
// 情境是讀檔案後存進資料庫


// 複習2022.1.8
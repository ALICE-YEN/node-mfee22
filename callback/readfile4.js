// Promise版(await)，看起來更像同步的程式(由上往下執行)
const { readFile } = require("fs/promises");

// (()=>{})(); IIFE立即執行的函式
// 錯誤訊息，try-catch
// await必須放在async函式裡
(async() => {
    try {
        let result = await readFile("test.txt", "utf-8");
        console.log(`這是內建的 promise 版本 ${result}`);
    } catch (err) {
        console.log(err);
    }
})();


// 做一個暫停的範圍
// 要給function名稱
// async function main() {
//     let result = await readFile("test.txt", "utf-8")
//     console.log(`這是內建的 promise 版本 ${result}`);
// };
// main();


// 複習2022.1.14
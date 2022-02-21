// Promise版，自己包
const { readFile } = require("fs");

// readFile非同步函式，丟給外包
let readfilePromise = new Promise((resolve, reject) => {
  readFile("test.txt", "utf-8", (err, data) => {
      if (err) {
          reject(err);
          return;
      }
      resolve(data);
  });
});

console.log(readfilePromise); // pending，因為剛剛包出來promise，還沒執行非同步readFile。

readfilePromise
.then((result) => {
  // 這邊會接住resolve
    console.log(`這裡是 Promise 的 result: ${result}`);
  })  
  .catch((err) => {
    console.error("這裡是 Promise 的 catch:", err);
  });


// 複習2022.1.8
// 建立變數且引入自行建立的模組
// let car = require("./car");
let car = require("./car2");

// 透過變數存取模組的方法
// 1. 這樣會整包匯入
// let fs = require("fs");
// fs.readFile();
// 2. 只引用其中一個函數，不用整包匯入
// let { readFile } = require("./fs")
// 這樣寫，自訂的函式名稱就不能相同
// readFile();

console.log(car.color);
car.color = "blue";
console.log(car.color);

car.setName("AAAA");
car.showName();

// 模組來源：
// 1. 內建的, fs
// 2. 第三方: mysql2, moment, axios, dotnev, ...
//    require("mysql2")
// 3. 自己開發的*
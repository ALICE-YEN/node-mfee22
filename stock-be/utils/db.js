// 資料庫連線工具
// npm i mysql2
const mysql = require("mysql2");
// 引入 require('dotenv').config() 後，只要再呼叫 PROCESS.ENV.[變數名稱]，就能將此環境參數撈出來了
require("dotenv").config();

// 把 createConnection 建立一條連線(爬蟲，只有我用，將資料爬到程式碼裡，一條連線夠用。但網站web server一條連線不夠用，有很多client同時對一個server發請求，只跟DB有一條連線不夠用)
// 改為 createPool 建立資料庫連線池
let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // 加上連線數限制
  connectionLimit: 10,
  // 遇到Date當字串處理，不要mysql2套件自行轉JS物件(英國時區)
  dateStrings: true,
});

// 傳回 pool.promise()
module.exports = pool.promise();

// 複習2022.2.16
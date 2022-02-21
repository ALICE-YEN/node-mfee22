// 2022/1/22的上課進度

// 先安裝express: npm install express
// 引用express
const express = require("express");

// 先安裝dotenv: npm install dotenv
// 引用dotenv，載入所有的環境變數儲存在process.env
require("dotenv").config();

// path 是 nodejs 內建的 library，不用安裝但要引用
const path = require("path");

// 引用db。雖然exports是一個pool，但講師習慣稱其connection，處理connection相關。
const connection =  require("./utils/db")

const cors = require("cors");

// 利用 express 這個 library 來建立一個 web app (express instance)
let app = express();

// express 是由 middleware 組成的
// request -> middlewar e 1 -> middleware 2 -> ... -> response
// 中間件順序很重要!! Express 會按照你程式碼的順序去決定 next 是誰
// 中間件裡一定要有 next 或是 res.xxx
// next: 往下一關走
// res.xxx 結束這次的旅程 (req-res cycle)

// 使用第三方開發的 cors 中間件
app.use(cors());

// 設定 express 要用的樣版引擎(template engine)
// views：參數
// view：視圖檔所在的目錄。
app.set("views", path.join(__dirname, "view"));
// view engine：要使用的範本引擎是pug。
// npm i pug
// prefix，非完整網誌
app.set("view engine", "pug");

// 使用 express 內建的中間件
// assets通常放靜態檔案: 圖片、js 檔案、css 檔案, html...
// assets跟__dirname(server.js)同一層，所以沒有".."，參考dirname - sub - second.js
// 寫法1: 不要有 網址 prefix
// localhost:3002/images/test.png，便可開啟test.png頁面
app.use(express.static(path.join(__dirname, "assets")));
// 寫法2: 有網址的 prefix
// localhost:3002/static/index.html --> 網址上就會有這個 url prefix
// localhost:3002/static/ --> index可以不用寫
app.use("/static", express.static(path.join(__dirname, "public")));

// 一般中間件(自己開發的)
// app.use(function (request, response, next) {});
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來拜訪嚕 at ${current.toISOString()}`);
  next();
  // res.send("Hello Middleware");
});

app.use((req, res, next) => {
  console.log("這是一個沒有用的中間件");
  next();
});

// router middleware
// app.get("/", function(request, response, next) {});
app.get("/", (req, res, next) => {
  console.info("拜訪首頁");
  // res.send ==> 純文字，而非html，網頁不可能這樣做
  // res.send("Hello Express");

  // 用 view engine 來渲染一個頁面
  // 渲染index.pug這個樣板
  // res.render ==> SSR (server-side render) 會去找樣板，把需要的html準備好再送到瀏覽器，後端產生完整html。 由Server端的 CPU 收到請求後，解析完整的 HTML 返回到使用者接收端，然後呈現網頁。
  // 比較：React是CSR (client-side render)，從瀏覽器拿到很簡單的html，其他東西react都處理好，前端產生完整html。 由Server端回傳資料，再由前端利用 Javascript 產生 HTML 。 在執行期間「動態」去跟後端Server拿資料，再動態產生看到的那些元素。
  // 建立路由，以呈現 index.pug 檔。如果未設定 view engine 內容，您必須指定 view 檔的副檔名。否則，您可以省略它。
  // 傳物件(資料)給前端
  res.render("index", {
    stocks: ["台積電", "長榮", "聯發科"],
  });
});

app.get("/about", (req, res, next) => {
  console.info("這是關於我們");
  // res.send: 要把response送回去，終點，後面不會再執行中間件。
  // res.send("我們是 MFEE22");
  next();
});

app.get("/about", (req, res, next) => {
  console.info("這是關於我們 B");
  // res.send("我們是 MFEE22 - Plan B");
  res.render("about"); // 渲染about.pug這個樣板
});

app.get("/contact", (req, res, next) => {
  console.info("有人訪問聯絡我們");
  // 故意製造錯誤，測試錯誤處理中間件
  throw new Error("故意製造的錯誤");
  res.send("這是聯絡我們");
});

// RESTful API的列表
// API，不是回html，而是單純回資料，建議在網址上加/api，可能再加版本號，不然後端路由路徑可能跟前端的衝突。
// terminal出來第一個陣列是資料
// 前端stock.js欲取得此資料
app.get("/api/stocks", async(req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM stocks");
  console.log(data);
  // 上面是ES6 解構賦值，可以抓出陣列中第一個陣列，和下面舊法結果相同
  // let result = await connection.execute("SELECT * FROM stocks");
  // let data = result[0];
  // 可以用瀏覽器檢查

  res.json(data);
})

// 在所有路由中間件的後面，是一般中間件
// 既然前面都比對不到，那表示這裡是 404
// 利用「順序」這件事來做 404
app.use((req, res, next) => {
  console.log("在所有路由中間件的後面 -> 404");
  res.status(404).send("Not Found");
});

// 錯誤中間件：放在所有中間件的後面
// 有四個參數，是用來「捕捉」錯誤的
app.use((err, req, res, next) => {
  console.log("來自四個參數的錯誤處理中間件", err);
  res.status(500).send("Server 錯誤: 請洽系統管理員");
});

// 設定port，從process.env讀取或設定預設值
const port = process.env.SERVER_PORT || 3000;
// 啟動server
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

// 複習2022.2.16
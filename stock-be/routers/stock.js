// 重構 server.js 的 /api/stocks、/api/stock/:stockId 有分頁
// 對應的前端 /stock-fe/routes/stock.js

// router小型路由模組
// 這是 stock 的 router
const express = require("express");
// 建立 Router 物件，像小型app，也是一個中間件
const router = express.Router();

// 引用db。雖然exports是一個pool，但講師習慣稱其connection，處理connection相關。
const connection = require("../utils/db");

// RESTful API 的列表
// 首頁路由 (http://localhost:3002/api/stock)，不用stocks違反RESTful API設計方式，但是方便
router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM stocks");
  console.log(data);
  
  res.json(data);
});

// stockId路由(http://localhost:3002/api/stock/0050?page=2)
router.get("/:stockId", async (req, res, next) => {
  // 取得目前在第幾頁
  let page = req.query.page || 1;
  console.log("page", page);

  // 取得目前的總筆數
  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?",
    [req.params.stockId]
  );
  console.log("total物件", total);
  total = total[0].total;
  console.log("total", total);

  // 計算總共應該要有幾頁 lastPage
  const perPage = 3;
  const lastPage = Math.ceil(total / perPage);

  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;
  // 取得資料
  let [data] = await connection.execute(
    "SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?",
    [req.params.stockId, perPage, offset]
  );

  // 準備要 response
  res.json({
    pagination: { total, perPage, page, lastPage },
    data,
  });
});

// 後端用CJS
// 用router物件取代
module.exports = router;

// 複習2022.2.18
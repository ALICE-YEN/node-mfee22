const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// 發請求方要給參數所以是req
// get方式：req.params 拿到網址上/的參數
// get方式：req.query 拿到網址上?xxx的變數(query string)
// post方式：
// 放第二個中間件
// /api/auth/register
router.post("/register",  (req, res, next) => {
    console.log("req.body", req.body);
    res.json({ message: "ok" });
});

module.exports = router;
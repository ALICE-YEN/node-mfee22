const express = require("express");
const router = express.Router();

// "/api/member" 為一樣的網址

// "/api/member/info"
router.get("/info", (req, res, next) => {
  res.json({
    id: 1,
    name: "小賴",
  });
});

module.exports = router;

// 複習2022.2.18
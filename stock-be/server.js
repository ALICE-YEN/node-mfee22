// 引入express
const express = require("express");
require("dotenv").config(); 

// 利用express這個library來建立一個web app
let app = express();
const port = process.env.SERVER_PORT || 3000; // process.env.port這個沒有設定，就採預設值3000。 但如果是帳號密碼就不能設預設值，但port可以。
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
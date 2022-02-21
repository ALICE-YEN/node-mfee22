// nodejs內建的模組，不用安裝
const http = require("http");
require("dotenv").config();

const server = http.createServer(function (request, response){
    // handle request
    // 怎麼處理request，要負責回覆response
    response.end("Hello, Server ABCD");
});

// 做預設值
let port = process.env.SERVER_PORT || 3000;
server.listen(port, () => {
    console.log(`我們的簡易版 server 已經啟動，在port ${port} 上`);
});
// server會一直啟動著，等client送request，server基本不會關
// 程式碼寫了沒動，關掉重啟，用nodemon套件，會自動幫忙重啟
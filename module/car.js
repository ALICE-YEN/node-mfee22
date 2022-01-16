// exports = module.exports = {};
// exports 本身是一個物件

const { showName } = require("./car2");

exports.color = "red";

let name = "default";

exports.setName = function (firstName, lastName) {
    name = `${firstName} ${lastName}`;
  };

exports.showName = function () {
  console.log(`Hi, ${name}`);
};

// return module.exports;
// 會在底層加一個 return module exports(如果沒有輸入的話)
// 因為module.exports = exports 
// 且沒有指定一個新的物件給module.exports 因此輸出的內容跟上面name一樣
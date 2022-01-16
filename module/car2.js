// exports = module.exports = {};
// exports 本身是一個物件

let name = "default";

function setName(newName) {
  name = newName;
}

function showName() {
  console.log(name);
}

module.exports = { setName, showName };

// return module.exports;
// 一開始 module.exports 跟 exports 是指向同一個記憶體位址
// 但因為下面又重新給exports建立另一個記憶體
// 但最後這邊回傳的是 module.exports，所以，如果有給 exports 一個新的物件，對外部是沒有用的。
// 最後回傳的 module.exports 還是空的
// exports = {setName, showName}
// module.exports = {setName, showName}
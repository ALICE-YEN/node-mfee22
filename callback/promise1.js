// 現在都用Promise寫法，不能用callback寫法(舊法)

// Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。
// 1. Promise 是一個物件
// new Promise()
// Promise()是一個建構式，他需要一個參數
// 這個executor也是一個函式 function() 也有兩個函數 resolve reject
// 2. 即將完成、或失敗
// resolve代表的是成功的時候要呼叫的
// reject是失敗的時候要呼叫的
// 3. 非同步

// new Promise((resolve, reject) => {});

let doWork = function (job, timer, callback) {
    return new Promise((resolve, reject) => { // resolve慣用，可改但不會去改
        setTimeout(() => {
            resolve(`完成工作 ${job}`); // 會把這一個 promise 物件的狀態變成 fulfilled
            
            // 如果發生錯誤
            // reject(err)
            // 會把這一個 promise 物件的狀態變成 rejected
        }, timer);
    });
  };
  
// 刷牙 --> 吃早餐 --> 寫功課
// let work1Promise = doWork("刷牙", 2000);
// work1Promise.then((result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

//   console.log(work1Promise);
//   Promise剛建立狀態會移轉，先是pending，呼叫resolve才會把物件狀態變為fulfilled

doWork("刷牙", 2000)
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
    return doWork("吃早餐", 3000);
  })
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
    return doWork("寫功課", 2000);
  })
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
  })
  .catch((err) => {
    // 處理錯誤
    console.error(err);
  });
// Promise不會像callback hell多層，效果一樣，但在同一層。


// 複習2022.1.8
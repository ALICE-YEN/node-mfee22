// Promise的方法：Promise.race
let doWork = function (job, timer) {
    return new Promise((resolve, reject) => { // resolve慣用，可改但不會去改
        setTimeout(() => {
            resolve(`完成工作 ${job}`); // 會把這一個 promise 物件的狀態變成 fulfilled
            
            // 如果發生錯誤
            // reject(err)
            // 會把這一個 promise 物件的狀態變成 rejected
        }, timer);
    });
  };

let p1 = doWork("刷牙", 2000);
let p2 = doWork("吃早餐", 3000);
let p3 = doWork("做功課", 2000);

// 三個中只要有一個做完就會回覆，比誰先做完
Promise.race([p1, p2, p3]).then((value) => {
    console.log(value);
});


// 複習2022.1.14
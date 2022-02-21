// Promise的方法：Promise.all
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

// 希望三件事同時做，做完再通知
let p1 = doWork("刷牙", 2000);
let p2 = doWork("吃早餐", 3000);
let p3 = doWork("做功課", 2000);

// 當三個全部都做完的時候，就會回來，一起執行，三秒
Promise.all([p1, p2, p3]).then((values) => {
    console.log(values);
});


// 複習2022.1.14
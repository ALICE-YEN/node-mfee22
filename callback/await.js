// await 是因為大家覺得Promise還是不夠好看
// 希望可以更像"同步"的程式(由上往下執行)(JavaScript本身就是非同步)
// await / async
// 是Promise的語法塘
// -> 還是要有Promise才可用
// 看到lib說自己是promise-based，那十之八九可以用

// 這邊和Promise同
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

// 刷牙 --> 吃早餐 --> 寫功課
let dt = new Date();
console.log(`Start at ${dt.toISOString()}`);

// 使用時有改變
// await 必須放在async函式裡
// async，讓暫停只暫停這個函式，而不是一人公司，這個函式暫停繼續做下一個。
// async function main() {
//     // await是一種暫停鍵，暫停到外包公司有結果為止，而且結果會被回傳、放到result1這個變數裡
//     let result1 = await doWork("刷牙", 2000);
//     let dt = new Date();
//     console.log(`${result1} at ${dt.toISOString()}`);

//     // result2拿到結果代表吃早餐已結束，便可以進行到下個階段寫功課
//     let result2 = await doWork("吃早餐", 3000);
//     dt = new Date();
//     console.log(`${result2} at ${dt.toISOString()}`);


//     let result3 = await doWork("寫功課", 2000);
//     dt = new Date();
//     console.log(`${result3} at ${dt.toISOString()}`);
// };

// main();

// (()=>{})(); IIFE立即執行的函式，只用一次，不取函式名字
(async () =>{
    try {
        let result1 = await doWork("刷牙", 2000);
        let dt = new Date();
        console.log(`${result1} at ${dt.toISOString()}`);

        let result2 = await doWork("吃早餐", 3000);
        dt = new Date();
        console.log(`${result2} at ${dt.toISOString()}`);


        let result3 = await doWork("寫功課", 2000);
        dt = new Date();
        console.log(`${result3} at ${dt.toISOString()}`);
    }catch (err) {
        console.log(err);
    }
})();


// 複習2022.1.14
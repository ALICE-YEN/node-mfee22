// callback、promise、await比較差異
// callback：4→1→3→5→2
function test() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 0);
    
    console.log(3);
}
console.log(4);
test();
console.log(5);


// promise：4→1→3→5→2
function test() {
    console.log(1);

    // Promise沒有改變機制，只是通知方式不同
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 0);
    })
    console.log(3);
}
console.log(4);
test();
console.log(5);


// await：4→1→5→2→3
async function test() {
    console.log(1);

    // async是範圍，看到await才暫停
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 0);
    })
    console.log(3);
}
console.log(4);
test();
console.log(5);


// 複習2022.1.14
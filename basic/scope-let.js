// let 會活在{}裡

// 01234
// 為什麼？
for (let i=0; i<5; i++){
    setTimeout(() => {
        console.log(i);
    }, 1000);
}


let a = 1;
{
    let a = 2 // 如果沒有此行，會往外找，1
    console.log(a); // 2
};
console.log(a); // 1
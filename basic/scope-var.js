// 55555
// 為什麼？

// for (var i=0; i<5; i++){
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

// 以前沒有let的解法，創一個{}給var
for (var i=0; i<5; i++){
    ((i) => {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    })(i);
}
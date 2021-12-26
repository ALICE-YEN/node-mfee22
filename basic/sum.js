function sum(n) {
    let result = 0;
    for(let i = 1; i < n+1; i++)
        result += i;
    return result;
}

console.log(sum(1));
console.log(sum(2));
console.log(sum(5));

// Promise版，新版才有這個
const { readFile } = require("fs/promises");

async function main() {
    let result = await readFile("test.txt", "utf-8")
    console.log(`這是內建的 promise 版本 ${result}`);
};
main();
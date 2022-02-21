// md5
const md5 = require("md5");
console.log(md5("test1234"));
console.log(md5("test1234"));
// 不同次跑結果一樣，不同電腦跑結果一樣
// 查表法可暴力破解

// bcrypt
const bcrypt = require("bcrypt");
(async () => {
    let result1 = await bcrypt.hash("test1234", 10);
    console.log("bcrypt 短:" result1);
    let result2 = await bcrypt.hash("test1234", 10);
    console.log("bcrypt 短:" result2);
    let result3 = await bcrypt.hash("test123456789mfee22", 10);
    console.log("bcrypt 長:" result3);
})
// 每次跑得結果不一樣

// argon2
const argon2 = require("argon2");
(async () => {
    let result1 = await argon2.hash("test1234", 10);
    console.log("argno2 短:" result1);
    let result2 = await argon2.hash("test1234", 10);
    console.log("argno2 短:" result2);
    let result3 = await argon2.hash("test123456789mfee22", 10);
    console.log("argon2 長:" result3);
})
// 更複雜、速度還比bcrypt快
// 不管密碼長度，hash結果的長度一樣，欄位要預留足夠長度
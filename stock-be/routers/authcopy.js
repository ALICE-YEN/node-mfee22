const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const bcrypt = require("bcrypt");

// npm i express-validator
// express-validator是很大的物件，目前只用body, validationResult，就先引用這兩個
const {body, validationResult} = require("express-validator");
// 用一個module，維持全站一制性、可讀性
const registerRules = [
    body("email").isEmail().withMessage("Email欄位請填寫正確格式"),
    body("password").isLength({min:8}).withMessage("密碼長度至少為8"),
    body("confirmPassword").custom((value, {req}) => {
        return value === req.body.password;
    })
    .withMessage("密碼驗證不一致"),
]

const multer = require("multer");
const e = require("express");
// 圖片要存在哪裡
const storage = multer.diskStorage({
    // 設定儲存的目的地(檔案夾)
    destination: function(req, file, cb) {
        // /public/uploads 檔案夾要先建好，不然出錯
        // 上傳圖片要幫忙先改名，怕有重複名稱、惡意難聽名稱(小專用假資料無注意到此問題)
        cb(null, path_join(__dirname, "..", "public", "uploads"));
    },
    filename: function(req, file, cb) {
        console.log("multer-filename", file);
        const ext = file.originalname.split(".").pop();
        cb(null, `member-${Date.now()}.${ext}`);
    },
});
const uploader = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        console.log("file.mimetype", file.mimetype);
        if(file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/jpeg"){
            cb(new Error("不接受的檔案型態"), false);
        }else{
            cb(null, true);
        }
    },
    limits:{

    },
});

// 發請求方要給參數所以是req
// get方式：req.params 拿到網址上/的參數
// get方式：req.query 拿到網址上?xxx的變數(query string)
// post方式：
// 放第二個中間件
// /api/auth/register
router.post("/register", uploader.single("photo"), registerRules, async (req, res, next) => {
    console.log("req.body:", req.body);

    // 拿到驗證結果
    const validateResult = validationResult(req);
    if(!validateResult.isEmpty()){
        let error = validateResult.array();
        console.log("validateResult", error);
        return res.status(400).json({
            code: "33001",
            msg: error[0].msg,
        });
    }
    // 檢查email是否已註冊
    let [members] = await connection.execute(
        "SELECT * FROM members WHERE email=?",
        [req.body.email]
      );
        console.log(members);
        if (members.length > 0) {
            // 表示有查到這個 email
            // -> 註冊過了
            return res.status(400).send({
              code: "33002",
              msg: "這個 email 已經註冊過了",
            });
          }
    // 雜湊password
        let hashPassword = await bcrypt.hash(req.body.password, 10);

    // 處理圖片
    console.log("req.file", req.file);
    let filename = req.file ? "/static/uploads/" + req.file.filename : "";
    console.log(filename);

    // 儲存到資料庫
    let [result] = await connection.execute(
        "INSERT INTO members (email, password, name, photo) VALUES (?, ?, ?, ?)",
        [req.body.email, hashPassword, req.body.name, ""]
      );
      console.log(result);
    
      res.json({ message: "ok" });
    });

router.post("/login",(req, res, next) => {
    // 確認有沒有這個帳號

    // 如果有這個帳號，再去比對密碼

    // 如果密碼比對成功，記錄在session
});

module.exports = router;
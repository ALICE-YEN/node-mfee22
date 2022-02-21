import { useState } from "react";
import axios from "axios"; // 將資料送到後端
import {API_URL} from "../utils/config";
import {ERR_MSG} from "../utils/error";

// 一般註冊表單不要那麼複雜，UX。因為是範例才多。
// 做物件把全部email、帳號...包起來設狀態，講師示範此。也可以各自設定。
const Register = () => {
  const [member, setMember] = useState({
    email: "gp4@gmail.com", // 看React底層
    name: "alice",
    password: "123",
    confirmPassword: "123",
    photo: "",
  });

  function handleChange(e){
      setMember({...member, [e.target.name]: e.target.value})
  };

  async function handleSubmit(e){
    // 關掉按下去會重整頁面的預設
    e.preventDefault();
    try{
      // 方法1：沒有上傳圖片
      // let response = await axios.post(`${API_URL}/auth/register`, member);
      // console.log(response.data); // response是axios回傳的物件
      // 方法2：有上傳圖片要用formData
      let formData = new FormData();
      formData.append("email", member.email);
      formData.append("name", member.name);
      formData.append("password", member.password);
      formData.append("confirmPassword", member.confirmPassword);
      formData.append("photo", member.photo);
    } catch(e) {
      // console.error("error", e.response.data);
      console.error("測試註冊", ERR_MSG[e.response.data.code]);
    }
}

  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">
        註冊帳戶
      </h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="email"
          name="email"
          value={member.email} // React
          // onChange={(e) => { // html
          //   setMember({...member, email: e.target.value}); // React
          // }}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={member.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="file"
          id="photo"
          name="photo"
          onChange={(e) => {
            // 圖片儲存方式不太一樣
            // 拿到圖檔二進位資料，非字串，不能綁定。二進位不能放進json，不能用handleChange
            setMember({...member, photo: e.target.files[0]});
          }}
        />
      </div>
      {/* onClick觸發事件，觸發事件時找這個函數來執行 callback function，而非直接執行handleSubmit()， */}
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
      onClick={handleSubmit}>
        註冊
      </button>
    </form>
  );
};

export default Register;

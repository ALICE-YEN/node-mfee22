import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
import { ERR_MSG } from "../utils/error";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { member, setMember } = useAuth();
  const [loginMember, setLoginMember] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  // 因為教學所以設定預設值
  // const [member, setMember] = useState({
  //   email: "ashleylai58@gmail.com",
  //   password: "test1234",
  // });

  function handleChange(e) {
    setLoginMember({ ...loginMember, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    // 關掉原本預設的行為
    e.preventDefault();

    try {
      // 方法1: 這個沒有圖片上傳
      let response = await axios.post(`${API_URL}/auth/login`, loginMember, {
        // 為了跨源存取 cookie
        withCredentials: true,
      });
      console.log(response.data);
      // 把 member 資料存回 context 讓其他地方可以用
      setMember(response.data.data);
      setIsLogin(true);
    } catch (e) {
      // console.error("error", e.response.data);
      console.error("測試登入", ERR_MSG[e.response.data.code]);
    }
  }

  if (isLogin) {
    // 轉頁效果
    return <Navigate to="/about" />;
  }

  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">
        登入帳戶
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
          value={loginMember.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={loginMember.password}
          onChange={handleChange}
        />
      </div>
      <button
        className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
        onClick={handleSubmit}
      >
        登入
      </button>
    </form>
  );
};

export default Login;

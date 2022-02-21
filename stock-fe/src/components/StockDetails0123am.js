// 2022/1/23早上的上課進度
// 未有分頁功能，後端data也沒有分頁資料(localhost:3002/api/stock/0050)

import { useEffect, useState } from "react";

// 後端要用是req帶過來(req.params)，
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import {API_URL} from "../utils/config"

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // 把前端網址上的參數stockId拿出來，要和App.js的網址參數相同
  const { stockId } = useParams();
  

  useEffect(() => {
    let getPrices = async() => {
      // http://localhost:3002/api/stock/0050
      let response = await axios.get(`${API_URL}/stock/${stockId}`);
      console.log(response)
      // 真正的資料會在response物件的data屬性裡
      setData(response.data);
    };
    getPrices();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}

      {data.map((item) => {
        return (
            <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6" key={item.date}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{item.date}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{item.amount}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{item.volume}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{item.open_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{item.close_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{item.delta_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{item.high_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{item.low_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{item.transactions}</h2>
            </div>
        );
      })}
    </div>
  );
};

export default StockDetails;

// 複習2022.2.17
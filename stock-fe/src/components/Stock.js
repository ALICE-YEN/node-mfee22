import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// axios前端、後端(爬蟲)都可用
// 先安裝 npm i axios
// 再引用 axios
import axios from "axios";

import {API_URL} from "../utils/config"

const Stock = () => {
  const [error, setError] = useState(null);
  // 講師習慣回傳資料是陣列，便放空陣列
  // 如果放null，初始對null做map會錯誤
  const [data, setData] = useState([]); 

  useEffect(() => {
    let getStock = async () => {
      //http://localhost:3002/api/stocks
      // 後端要啟動，前端才能跑出資料
      // 透過axios拿到資料
      // 不要把網址在程式寫死
      let response = await axios.get(`${API_URL}/stock`);
      console.log(response);
      // 真正的資料會在response物件的data屬性裡，set State
      setData(response.data);
      // 因為同源政策，在瀏覽器會被擋，但在nodejs可跑(同樣的程式碼只是setData改成console.log)
      // 所以要在server(stock-be)同意同源cors(第三方套件)
    };
    getStock();
  },[]);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      {
        data.map((stock) => {
          return (
            <>
            {/* React map資料，要有key去分辨資料。 */}
              <div key={stock.id} className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
                <Link to={`/stock/${stock.id}`}>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">{stock.id}</h2>
                  <p className="text-gray-700">{stock.name}</p>
                </Link>
              </div>
            </>
          )
        })
      }
    </div>
  );
};

export default Stock;

// 複習2022.2.16
// 不知為何還是無法消除!!! Warning: Each child in a list should have a unique "key" prop.
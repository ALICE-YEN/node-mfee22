// 2022/1/23下午的上課進度
// 有分頁功能，後端data有分頁資料(localhost:3002/api/stock/0050)

import { useEffect, useState } from "react";

// 後端要用是req帶過來(req.params)
// react-router-dom 6 是 useNavigate，react-router-dom 5 是 useHistory
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import {API_URL} from "../utils/config"

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // 總共有lastPage這麼多頁
  const [lastPage, setLastPage] = useState(1);

  // 為了處理網址
  let navigate = useNavigate();

  // 把前端網址上的參數stockId、currentPage拿出來，要和App.js的網址參數相同
  const { stockId } = useParams();
  const { currentPage } = useParams();
  // /stock/2330 => currnetPage 會是 undefined
  // /stock/2330/2 => currentPage 會是 2

  // currentPage原本是字串，要轉成數字
  // let page = currentPage ? parseInt(currentPage, 10) : 1;
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1);
  console.log("currentPage", currentPage, page);

  useEffect(() => {
    let getPrices = async() => {
      // http://localhost:3002/api/stock/0050
      let response = await axios.get(`${API_URL}/stock/${stockId}?page=${page}`);
      console.log(response)
      // 真正的資料會在response物件的data屬性裡
      // 加入pagination後，又一層才有data
      setData(response.data.data);
      setLastPage(response.data.pagination.lastPage);
    };
    getPrices();
  }, [page]);

console.log(data);

  // 做分頁UI
  // i是for迴圈的index，講師說for迴圈用index當key不見得好，但沒有別的可用。 萬一從中插入資料，原本跟新的第n個資料會不一樣。 但頁碼少，不至於傷害效能。
  const getPages = () => {
    let pages = [];
    for(let i = 1; i <= lastPage; i++){
      pages.push(
        <li
          style={{
            display: "inline-block",
            margin: "2px",
            backgroundColor: page === i ? "#00d1b2" : "",
            borderColor: page === i ? "#00d1b2" : "#dbdbdb",
            color: page === i ? "#fff" : "#363636",
            borderWidth: "1px",
            width: "28px",
            height: "28px",
            borderRadius: "3px",
            textAlign: "center",
          }}
          key={i}
          onClick={(e) => {
            setPage(i); // 改變Page狀態
            navigate(`/stock/${stockId}/${i}`); // 改變網址上的頁碼
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      {error && <div>{error}</div>}

      <ul>{getPages()}</ul>

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
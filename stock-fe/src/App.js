import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Stock from "./components/Stock";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import StockDetails from "./components/StockDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Stock />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* :意思是後面有參數，沒有寫死 */}
        {/* react-router-dom: 6.2.1 有新寫法 */}
        <Route path="/stock/:stockId" element={<StockDetails />}>
          <Route path=":currentPage" element={<StockDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// 複習2022.2.16

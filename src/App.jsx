import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// import Products from "./pages/Products";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        {/* <Route path="/Products" element={<Products />} /> */}
        {/* <Route path="/Products/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>
    </>
  );
}

export default App;

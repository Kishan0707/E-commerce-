import React, { useState } from "react";
import { useEffect } from "react";
const Navbar = ({ search, setSearch }) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  });

  function calculateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQty);
  }

  useEffect(() => {
    window.addEventListener("cartUpdated", calculateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", calculateCartCount);
    };
  }, []);
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 w-full z-50
                    bg-white/5 backdrop-blur-md
                    border-b border-white/20"
      >
        <div className="flex gap-5 justify-between p-5">
          <div>
            <i className="fa-solid fa-cart-shopping text-blue-500 text-4xl"></i>
          </div>
          <div className="bg-gray-100 rounded-lg items-center flex gap-3 w-2xl px-3">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full"
              placeholder="Search products..."
            />
          </div>
        </div>
        <div>
          {filteredProducts.map(product => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      </nav>
        <div className="flex gap-5 justify-between p-5">
          <div>
            <i className="fa-solid fa-cart-shopping text-blue-500 text-4xl"></i>
          </div>
          {/*  */}
          <div className="bg-gray-100 rounded-lg items-center flex gap-3 w-2xl px-3">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            <input
              type="search"
              value={search}
              className="bg-transparent w-full"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your products"
            />
          </div>

          <div className="bg-white border border-gray-300 rounded-lg flex  p-3 items-center justify-center relative cursor-pointer">
            <i className="fa-regular fa-cart-shopping"></i>
            <span
              id="cartCount"
              className="absolute -top-2 -right-3 bg-red-500 text-white text-xs p-2 rounded-full"
            >
              {cartCount}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

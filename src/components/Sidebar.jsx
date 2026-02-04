import React from "react";

const Sidebar = () => {
  return (
    <>
      <div
        className="fixed left-0 w-60 h-screen backdrop-blur-md pt-5 px-5
        transition-all duration-300 ease-in-out
        translate-x-0 opacity-100"
        id="Sidebar"
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold mb-3 text-lg">Categories</h1>
        </div>
        <div className="flex flex-col gap-2 text-sm font-semibold border-b pb-5 border-gray-300">
          <div className="flex gap-2">
            {/* <i class="fa-solid fa-mobile-screen-button"></i> */}
            <input
              type="checkbox"
              name=""
              id="Electronics"
              className="category-filter"
              onChange={() => window.filterProducts()}
            />
            <label htmlFor="Electronics">Electronics</label>
          </div>
          <div className="flex gap-2">
            {/* <i class="fa-solid fa-shirt"></i> */}
            <input
              type="checkbox"
              name=""
              id="Fashion"
              onChange={() => window.filterProducts()}
              className="category-filter"
            />
            <label htmlFor="Fashion" className="input">
              Fashion
            </label>
          </div>
          <div className="flex gap-2">
            {/* <i class="fa-solid fa-keyboard"></i> */}
            <input
              type="checkbox"
              name=""
              id="Accessories"
              onChange={() => window.filterProducts()}
              className="category-filter"
            />
            <label htmlFor="Accessories" className="input">
              Accessories
            </label>
          </div>
        </div>
        {/* Price rang  */}
        <div>
          <h1 className="font-bold text-lg">Price Range</h1>
          <div className="w-full">
            <input
              type="range"
              id="priceRange"
              min="0"
              max="2000"
              defaultValue="2000"
              className="w-full"
              onChange={() => window.filterProducts()}
            />
            <div className="flex justify-between">
              <span>₹0</span>
              <span id="priceValue">₹2000</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

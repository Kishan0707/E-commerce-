import React, { useEffect } from "react";
import { products } from "../data/products";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // Import the Navbar component

const Products = ({ search }) => {
  function menu() {
    const Sidebar = document.getElementById("Sidebar");
    const content = document.getElementById("ProductContent");
    if (Sidebar.classList.contains("translate-x-0")) {
      Sidebar.classList.add("-translate-x-full", "opacity-0");
      Sidebar.classList.remove("translate-x-0", "opacity-100");
      content.classList.remove("ml-60");
      content.classList.add("ml-0");
    } else {
      Sidebar.classList.remove("-translate-x-full", "opacity-0");
      Sidebar.classList.add("translate-x-0", "opacity-100");
      content.classList.remove("ml-0");
      content.classList.add("ml-60");
    }
  }
  const filterProducts = products.filter((product) => {
    return product.name?.includes(search?.toLowerCase() || "");
  });
  useEffect(() => {
    updateCartCountUI();
    window.filterProducts = function () {
      const checkedCategories = [];
      document
        .querySelectorAll(".category-filter:checked")
        .forEach((checkbox) => {
          checkedCategories.push(checkbox.id);
        });

      const priceInput = document.getElementById("priceRange");
      const maxPrice = Number(priceInput?.value || Infinity);

      const priceValue = document.getElementById("priceValue");
      if (priceValue) {
        priceValue.innerText = `₹${maxPrice}`;
      }

      const productCards = document.querySelectorAll(".product-card");
      //! hw many product visible after filter
      let visibleCount = 0;
      productCards.forEach((product) => {
        const category = product.dataset.category;
        const price = Number(product.dataset.price);

        const categoryMatch =
          checkedCategories.length === 0 ||
          checkedCategories.includes(category);

        const priceMatch = price <= maxPrice;

        if (categoryMatch && priceMatch) {
          product.classList.remove("hidden");
          visibleCount++;
        } else {
          product.classList.add("hidden");
        }
      });

      const countEl = document.getElementById("productCount");
      if (countEl) {
        countEl.innerText = `${visibleCount} Product found`;
      }
    };
    window.addEventListener("storage", updateCartCountUI);
    return () => {
      window.removeEventListener("storage", updateCartCountUI);
    };
    // addToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addToCart(product) {
    let cart = getCart();

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // updateCartCountUI(); // ✅ sync navbar
    window.dispatchEvent(new Event("cartUpdated"));
  }
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function updateCartCountUI() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
      cartCountEl.innerText = totalQty;
    }
  }

  return (
    <>
      <Sidebar />
      <div
        className="ml-60 transition-all duration-300 ease-in-out px-5"
        id="ProductContent"
      >
        {/* Header */}
        <div className="flex flex-col gap-3 mb-5  font-bold">
          <button
            onClick={menu}
            className="cursor-pointer border-2 border-gray-300 text-gray-300 rounded-3xl"
          >
            ☰
          </button>
          <h1 className="font-bold text-lg">All Products</h1>
          <p id="productCount">{filterProducts.length} products found</p>
        </div>

        <div
          className="grid place-items-center place-content-center items-center md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 transition-all duration-300 ease-in-out
         opacity-100 mb-15"
        >
          {filterProducts.map((product) => (
            <div
              key={product.id}
              data-category={product.category}
              data-price={product.price}
              className="product-card flex flex-col bg-white rounded-2xl shadow-sm"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-[300px] h-[300px] object-cover rounded-t-2xl"
              />

              {/* Content */}
              <div className="p-5">
                <span className="bg-gray-200 px-3 py-1 rounded-2xl text-sm">
                  {product.category}
                </span>
                <h1 className="text-lg font-semibold mt-3">{product.name}</h1>

                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">⭐ {product.rating}</p>

                <button
                  className="bg-black text-white py-2 rounded-lg mt-4 w-full cursor-pointer hover:opacity-70 transition-all duration-300"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

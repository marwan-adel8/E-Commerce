import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🆕 import

import { addToCart } from "../Redux/appSlice";
import productData from "../data/productData";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🆕 استخدمه للتنقل
  const [showMessage, setShowMessage] = useState(false);

  const categories = Object.keys(productData);
  const allProducts = categories.flatMap((category) => productData[category]);

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : productData[selectedCategory] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* رسالة نجاح الإضافة */}
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
        >
          Added to cart successfully!
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Products</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded capitalize ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
        <motion.div
  key={product.id}
  className="bg-white rounded-xl shadow hover:shadow-md p-4 border cursor-pointer transition"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
  onClick={() =>
    navigate(`/product/${product.id}`, {
      state: { product },
    })
  }
>
  {/* ✅ صورة مع hover + tap animation */}
  <motion.img
    src={product.image}
    alt={product.title}
    className="h-40 object-contain mx-auto mb-4"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
  />

  <h2 className="text-sm font-semibold mb-1">{product.title}</h2>
  <p className="text-indigo-600 font-bold mb-1">
    {product.price.toFixed(2)} EGP
  </p>
  <p className="text-yellow-500 text-sm">
    ⭐ {product.rating?.rate} ({product.rating?.count})
  </p>

  <button
    className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700 transition mt-2 w-full"
    onClick={(e) => {
      e.stopPropagation(); // ❗ منع التنقل عند الضغط على الزر فقط
      dispatch(
        addToCart({
          id: product.id,
          img: product.image,
          price: product.price,
          categ: selectedCategory,
          title: product.title,
          desc: product.description || "No description available",
          quantity: 1,
        })
      );
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2500);
    }}
  >
    <FaShoppingCart />
    Add to cart
  </button>
</motion.div>

        ))}
      </div>
    </div>
  );
};

export default AllProducts;

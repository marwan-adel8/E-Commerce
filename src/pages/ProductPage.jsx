import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/appSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = {
    id: 1,
    img: "images/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png",
    price: 550,
    oldPrice: 600,
    category: "Speakers",
    title: "JBL Boombox 2 Wireless Bluetooth Speaker",
    desc: "Enjoy powerful sound and deep bass with the JBL Boombox 2. Its portable design and waterproof build make it perfect for outdoor adventures, beach parties, or home listening.",
    stock: 3,
    discount: 8,
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen mt-24">
      {/* رسالة نجاح الإضافة */}
    {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "default", // خليت الكيرسور default عشان مش قابل للنقر برا
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "30px 40px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              maxWidth: "400px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              textAlign: "center",
              position: "relative", // عشان زرار الخروج يبقى في المكان الصح
              cursor: "default",
            }}
          >
            {/* زرار الخروج */}
            <button
              onClick={() => setShowMessage(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                lineHeight: "1",
              }}
              aria-label="Close"
            >
              &times;
            </button>

            <p className="text-lg font-semibold mb-4">
              The product has been successfully added to your cart!{" "}
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowMessage(false)}
                className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
                style={{ minWidth: "120px" }}
              >
                Continue shopping{" "}
              </button>
              <button
                onClick={() => Navigate("/cart")}
                className="bg-indigo-700 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-800 transition"
                style={{ minWidth: "120px" }}
              >
                shopping cart{" "}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* صورة المنتج */}
        <div className="w-full md:w-1/2 text-center">
          <div className="relative inline-block w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-auto object-contain"
            />
            <span className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs rounded-bl">
              %{product.discount}
            </span>
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="w-full md:w-1/2">
          <div className="mb-4 text-sm text-gray-600">
            <Link to="/" className="text-indigo-600 hover:underline">
              Home
            </Link>{" "}
            &lt; {product.title}
          </div>

          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">(0 reviews)</span>
            <span className="ml-2 text-sm text-indigo-600 cursor-pointer">
              Write a review
            </span>
          </div>

          <p className="text-gray-700 mb-4">{product.desc}</p>

          <div className="text-lg mb-1 text-gray-600">
            Category: {product.category}
          </div>
          <div className="text-3xl text-indigo-600 font-bold mb-2">
            {product.price}.00 EGP
          </div>
          <div className="line-through text-gray-400 mb-2">
            {product.oldPrice}.00 EGP
          </div>
          <div className="mb-4 text-sm text-gray-700">In stock: {product.stock}</div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mb-4">
            <label className="text-gray-700">Quantity:</label>
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() =>
                  setQuantity((prev) => Math.min(prev + 1, product.stock))
                }
                className="bg-indigo-600 text-white w-8 hover:bg-indigo-700"
              >
                +
              </button>
              <input
                type="text"
                value={quantity}
                className="w-12 text-center border-x outline-none"
                readOnly
              />
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="bg-indigo-600 text-white w-8 hover:bg-indigo-700"
              >
                -
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              className="flex items-center justify-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id,
                    img: product.img,
                    price: product.price,
                    categ: product.category,
                    title: product.title,
                    desc: product.desc,
                    quantity,
                  })
                );
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2500);
              }}
            >
              <FaShoppingCart className="text-sm" />
              Add to Cart
            </button>

            <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

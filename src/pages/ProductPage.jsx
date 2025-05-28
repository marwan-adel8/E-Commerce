import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/appSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  const product = {
    id: 1,
    img: "/public/images/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png",
    price: 550,
    oldPrice: 600,
    category: "Speakers",
    title: "JBL Boombox 2 Wireless Bluetooth Speaker",
    desc: "Enjoy powerful sound and deep bass with the JBL Boombox 2. Its portable design and waterproof build make it perfect for outdoor adventures, beach parties, or home listening.",
    stock: 3,
    discount: 8,
  };
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen mt-24">
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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Product Details */}
        <div className="flex-1">
         <div className="mb-4 text-sm text-gray-600">
  <Link to="/" className="text-indigo-600 hover:underline">
    Home
  </Link> &lt; {product.title}
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

          <div className="text-lg mb-1 text-gray-600">Category: {product.category}</div>
          <div className="text-3xl text-indigo-600 font-bold mb-2">{product.price}.00 EGP</div>
          <div className="line-through text-gray-400 mb-2">{product.oldPrice}.00 EGP</div>
          <div className="mb-4 text-sm text-gray-700">In stock: {product.stock}</div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mb-4">
            <label className="text-gray-700">Quantity:</label>
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => setQuantity(prev => Math.min(prev + 1, product.stock))}
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
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
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
    setShowMessage(true); // <-- إظهار الرسالة
    setTimeout(() => setShowMessage(false), 2500); // <-- إخفاؤها بعد 2.5 ثانية
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

        {/* Product Image */}
        <div className="flex-1 text-center">
          <div className="relative inline-block">
            <img
              src={product.img}
              alt={product.title}
              className="max-w-sm mx-auto"
            />
            <span className="absolute top-0 right-0 bg-red-600 text-white px-2 text-sm rounded-bl">
              %{product.discount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

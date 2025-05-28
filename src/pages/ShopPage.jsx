import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/appSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { id: "mens", label: "Mens", image: "/images/mens-clothes.jpg" },
  { id: "woman", label: "Woman", image: "/images/woman.jpg" },
  { id: "smartwatch", label: "SmartWatch", image: "/images/watch.jpg" },
  { id: "phone", label: "Phone", image: "/images/phone.jpg" },
  { id: "Tv", label: "Tv", image: "/images/tv.jpg" },
  { id: "perfume", label: "Perfume", image: "/images/perfume.jpg" },
];

// وظيفة بسيطة تولد تقييم وهمي
const generateRating = () => ({
  rate: (Math.random() * 2 + 3).toFixed(1), // قيم بين 3.0 و 5.0
  count: Math.floor(Math.random() * 500 + 50),
});

const enrichWithRating = (products) =>
  products.map((product) => ({
    ...product,
    rating: generateRating(),
  }));

const productData = {
  mens: enrichWithRating([
    {
      id: 1,
      title: "T-shirt رجالي",
      image:
        "https://m.media-amazon.com/images/I/51m0bsjzTEL._AC_UL480_FMwebp_QL65_.jpg",
      price: 199.99,
      desc: "Men's casual slim-fit T-shirt with a comfortable and modern design.",
    },
    {
      id: 2,
      title: "T-shirt Round",
      image:
        "https://m.media-amazon.com/images/I/711jT-lhO4L._AC_UL480_FMwebp_QL65_.jpg",
      price: 499.99,
      desc: "High-quality round-neck T-shirt perfect for everyday wear.",
    },
    {
      id: 3,
      title: "Sports set",
      image:
        "https://m.media-amazon.com/images/I/41AIb1EM0OL._AC_UL480_FMwebp_QL65_.jpg",
      price: 299.99,
      desc: "Comfortable sportswear set ideal for gym and workouts.",
    },
    {
      id: 4,
      title: "Plain T-shirt ",
      image:
        "https://m.media-amazon.com/images/I/414LOeMzAPL._AC_UL480_FMwebp_QL65_.jpg",
      price: 249.99,
      desc: "Basic plain T-shirt made from soft cotton fabric.",
    },
    {
      id: 5,
      title: " T-shirt رجالي",
      image:
        "https://m.media-amazon.com/images/I/71brH30lVjL._AC_UL480_FMwebp_QL65_.jpg",
      price: 149.99,
      desc: "Lightweight men's T-shirt with a relaxed fit for daily use.",
    },
    {
      id: 6,
      title: " Classic black shirt",
      image:
        "https://m.media-amazon.com/images/I/616xzQxZUdL._AC_UL480_FMwebp_QL65_.jpg",
      price: 899.99,
      desc: "Elegant classic black shirt suitable for formal and semi-formal occasions.",
    },
    {
      id: 7,
      title: "Classic white shirt ",
      image:
        "https://m.media-amazon.com/images/I/61caQX0eO8L._AC_UL480_FMwebp_QL65_.jpg",
      price: 129.99,
      desc: "Timeless white shirt made with premium breathable fabric.",
    },
    {
      id: 8,
      title: "Black classic trousers ",
      image:
        "https://m.media-amazon.com/images/I/61HK5s-K2KL._AC_UL480_FMwebp_QL65_.jpg",
      price: 349.99,
      desc: "Versatile black trousers designed for both office and casual looks.",
    },
  ]),

  woman: enrichWithRating([
    {
      id: 9,
      title: "Evening dress",
      image:
        "https://m.media-amazon.com/images/I/41wgIe7jS4L._AC_UL480_FMwebp_QL65_.jpg",
      price: 699.99,
      desc: "Elegant evening dress perfect for formal occasions and parties.",
    },
    {
      id: 10,
      title: "Women's dress",
      image:
        "https://m.media-amazon.com/images/I/61SQEAYZQlL._AC_UL480_FMwebp_QL65_.jpg",
      price: 299.99,
      desc: "Stylish and comfortable women's dress suitable for daily wear.",
    },
    {
      id: 11,
      title: "Women's abaya",
      image:
        "https://m.media-amazon.com/images/I/71rI7S+zxTL._AC_UL480_FMwebp_QL65_.jpg",
      price: 179.99,
      desc: "Traditional and elegant abaya for a modest and graceful look.",
    },
    {
      id: 12,
      title: "Women's coat",
      image:
        "https://m.media-amazon.com/images/I/41Ehmn4F1PL._AC_UL480_FMwebp_QL65_.jpg",
      price: 499.99,
      desc: "Warm and stylish coat designed for cold weather comfort.",
    },
    {
      id: 13,
      title: "Women's dress",
      image:
        "https://m.media-amazon.com/images/I/51afWZI08YL._AC_UL480_FMwebp_QL65_.jpg",
      price: 249.99,
      desc: "Chic and lightweight dress ideal for spring and summer days.",
    },
    {
      id: 14,
      title: "Prayer veil",
      image:
        "https://m.media-amazon.com/images/I/61GyaQ0WrnL._AC_UL480_FMwebp_QL65_.jpg",
      price: 399.99,
      desc: "Soft and elegant prayer veil offering full coverage and comfort.",
    },
    {
      id: 15,
      title: "Cotton T-shirt",
      image:
        "https://m.media-amazon.com/images/I/51zWhDROtWL._AC_UL480_FMwebp_QL65_.jpg",
      price: 299.99,
      desc: "Breathable cotton T-shirt perfect for casual and everyday wear.",
    },
    {
      id: 16,
      title: "Gulf Abaya",
      image:
        "https://m.media-amazon.com/images/I/41ZwAmb56KL._AC_UL480_FMwebp_QL65_.jpg",
      price: 349.99,
      desc: "Premium Gulf-style abaya with elegant embroidery and soft fabric.",
    },
  ]),

  smartwatch: enrichWithRating([
    {
      id: 17,
      title: "Apple Watch Series 9",
      image:
        "https://m.media-amazon.com/images/I/71aXGgNCE9L._AC_UL480_FMwebp_QL65_.jpg",
      price: 3999.99,
      desc: "Advanced smartwatch from Apple with fitness tracking and smart features.",
    },
    {
      id: 18,
      title: "Samsung Galaxy Watch",
      image:
        "https://m.media-amazon.com/images/I/51bGEHwzffL._AC_UL480_FMwebp_QL65_.jpg",
      price: 3299.99,
      desc: "Stylish smartwatch with health monitoring and seamless Android integration.",
    },
    {
      id: 19,
      title: "Huawei Watch Fit",
      image:
        "https://m.media-amazon.com/images/I/51Drlu9gFrL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1499.99,
      desc: "Slim and sporty watch with long battery life and fitness tracking.",
    },
    {
      id: 20,
      title: "Fitbit Versa 4",
      image:
        "https://m.media-amazon.com/images/I/61OEuoqFqYL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1999.99,
      desc: "User-friendly smartwatch focused on health, sleep, and fitness tracking.",
    },
    {
      id: 21,
      title: "Amazfit GTS 2",
      image:
        "https://m.media-amazon.com/images/I/514QJrswoEL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1799.99,
      desc: "Affordable and elegant watch with AMOLED screen and wellness features.",
    },
    {
      id: 22,
      title: "Xiaomi Mi Watch",
      image:
        "https://m.media-amazon.com/images/I/61OhQCN2QFL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1399.99,
      desc: "Smartwatch with GPS, heart-rate tracking, and long battery life.",
    },
    {
      id: 23,
      title: "Noise ColorFit",
      image:
        "https://m.media-amazon.com/images/I/61JhVJXdj1L._AC_UL480_FMwebp_QL65_.jpg",
      price: 899.99,
      desc: "Budget-friendly smartwatch with essential features and colorful display.",
    },
    {
      id: 24,
      title: "Garmin Venu 2",
      image:
        "https://m.media-amazon.com/images/I/61oLm0rWyGL._AC_UL480_FMwebp_QL65_.jpg",
      price: 4499.99,
      desc: "High-end fitness watch with advanced health metrics and GPS tracking.",
    },
  ]),

  phone: enrichWithRating([
    {
      id: 25,
      title: "iPhone 16 Pro",
      image:
        "https://m.media-amazon.com/images/I/61bMJdgeryL._AC_UL480_FMwebp_QL65_.jpg",
      price: 34999.99,
      desc: "Apple's flagship phone with top-tier performance and camera quality.",
    },
    {
      id: 26,
      title: "Samsung Galaxy S23",
      image:
        "https://m.media-amazon.com/images/I/617l83eY1rL._AC_UL480_FMwebp_QL65_.jpg",
      price: 29999.99,
      desc: "Powerful Android phone with sleek design and advanced features.",
    },
    {
      id: 27,
      title: "Xiaomi Redmi Note 13",
      image:
        "https://m.media-amazon.com/images/I/51szbG6FOgL._AC_UL480_FMwebp_QL65_.jpg",
      price: 11999.99,
      desc: "Great value smartphone with high refresh rate screen and big battery.",
    },
    {
      id: 28,
      title: "Oppo Reno 8",
      image:
        "https://m.media-amazon.com/images/I/61cIST+osWL._AC_UL480_FMwebp_QL65_.jpg",
      price: 10499.99,
      desc: "Stylish mid-range phone with good camera and fast charging.",
    },
    {
      id: 29,
      title: "Infinix Zero 30",
      image:
        "https://m.media-amazon.com/images/I/51mIxR9tPZL._AC_UL480_FMwebp_QL65_.jpg",
      price: 8999.99,
      desc: "Affordable phone with modern design and smooth performance.",
    },
    {
      id: 30,
      title: "Realme 12 Pro",
      image:
        "https://m.media-amazon.com/images/I/81dA4WginXL._AC_UL480_FMwebp_QL65_.jpg",
      price: 10999.99,
      desc: "Feature-packed phone with strong battery life and fast display.",
    },
    {
      id: 31,
      title: "Vivo Y19",
      image:
        "https://m.media-amazon.com/images/I/51LzJ4QbNoL._AC_UL480_FMwebp_QL65_.jpg",
      price: 6999.99,
      desc: "Entry-level smartphone with reliable performance and large screen.",
    },
    {
      id: 32,
      title: "Nokia G60",
      image:
        "https://m.media-amazon.com/images/I/61kGZOncTpL._AC_UL480_FMwebp_QL65_.jpg",
      price: 6499.99,
      desc: "Durable and dependable phone with clean Android experience.",
    },
  ]),

  Tv: enrichWithRating([
    {
      id: 33,
      title: 'Samsung 55" Smart TV',
      image:
        "https://m.media-amazon.com/images/I/81OJT1hDMeL._AC_UL480_FMwebp_QL65_.jpg",
      price: 11999.99,
      desc: "4K smart TV with vivid display and built-in streaming apps.",
    },
    {
      id: 34,
      title: 'LG 50" UHD',
      image:
        "https://m.media-amazon.com/images/I/61tkSCoVRjL._AC_UL480_FMwebp_QL65_.jpg",
      price: 9999.99,
      desc: "Crystal-clear UHD screen with webOS smart TV features.",
    },
    {
      id: 35,
      title: 'Toshiba 43" Full HD',
      image:
        "https://m.media-amazon.com/images/I/615k4OSbsNS._AC_UL480_FMwebp_QL65_.jpg",
      price: 7499.99,
      desc: "Reliable Full HD TV with vibrant colors and HDMI ports.",
    },
    {
      id: 36,
      title: 'TCL 32" HD',
      image:
        "https://m.media-amazon.com/images/I/71-eFd5uaOL._AC_UL480_FMwebp_QL65_.jpg",
      price: 5499.99,
      desc: "Compact HD smart TV with streaming support and great sound.",
    },
    {
      id: 37,
      title: 'Sharp 65" 4K',
      image:
        "https://m.media-amazon.com/images/I/41mxhc4WdpL._AC_UL480_FMwebp_QL65_.jpg",
      price: 13499.99,
      desc: "Large 4K display TV with immersive viewing experience.",
    },
    {
      id: 38,
      title: 'Sony 55" Android TV',
      image:
        "https://m.media-amazon.com/images/I/81OJT1hDMeL._AC_UL480_FMwebp_QL65_.jpg",
      price: 13999.99,
      desc: "Premium Android smart TV with Google Assistant support.",
    },
    {
      id: 39,
      title: 'Hisense 40"',
      image:
        "https://m.media-amazon.com/images/I/710B5HY6ddL._AC_UL480_FMwebp_QL65_.jpg",
      price: 5999.99,
      desc: "Great budget TV with full HD display and HDMI connectivity.",
    },
    {
      id: 40,
      title: 'Panasonic 50"',
      image:
        "https://m.media-amazon.com/images/I/61TXw5Vn5IL._AC_UL480_FMwebp_QL65_.jpg",
      price: 8899.99,
      desc: "Reliable 50-inch TV with stunning visuals and clear audio.",
    },
  ]),

  perfume: enrichWithRating([
    {
      id: 41,
      title: "Dior Sauvage",
      image:
        "https://m.media-amazon.com/images/I/41aTA7NtT0L._AC_UL480_FMwebp_QL65_.jpg",
      price: 1999.99,
      desc: "Bold and fresh fragrance for men with lasting impact.",
    },
    {
      id: 42,
      title: "Chanel No.5",
      image:
        "https://m.media-amazon.com/images/I/61OO1-L9VSL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1899.99,
      desc: "Iconic and timeless perfume with floral and classic notes.",
    },
    {
      id: 43,
      title: "Versace Eros",
      image:
        "https://m.media-amazon.com/images/I/61j1jrAGuiL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1499.99,
      desc: "Fresh, woody fragrance for confident and bold men.",
    },
    {
      id: 44,
      title: "Armani Code",
      image:
        "https://m.media-amazon.com/images/I/511utzSCK7L._AC_UL480_FMwebp_QL65_.jpg",
      price: 1599.99,
      desc: "Seductive fragrance for men with a spicy oriental touch.",
    },
    {
      id: 45,
      title: "Gucci Bloom",
      image:
        "https://m.media-amazon.com/images/I/61hqJ+495zL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1799.99,
      desc: "Floral and feminine scent perfect for elegant women.",
    },
    {
      id: 46,
      title: "Burberry Her",
      image:
        "https://m.media-amazon.com/images/I/71VbtYucFbL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1399.99,
      desc: "Vibrant fruity fragrance capturing London spirit.",
    },
    {
      id: 47,
      title: "YSL Libre",
      image:
        "https://m.media-amazon.com/images/I/71ntiXdn4FL._AC_UL480_FMwebp_QL65_.jpg",
      price: 1699.99,
      desc: "Bold floral fragrance with a modern twist for women.",
    },
    {
      id: 48,
      title: "Tom Ford Noir",
      image:
        "https://m.media-amazon.com/images/I/51FNgktsHdL._AC_UL480_FMwebp_QL65_.jpg",
      price: 2299.99,
      desc: "Deep and mysterious fragrance with warm oriental notes.",
    },
  ]),
};

const ShopPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // قراءة الكاتيجوري من query param
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className=" mx-auto px-4 py-12 ">
      {/* رسالة الإضافة تظهر في وسط الشاشة */}
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
                onClick={() => navigate("/cart")}
                className="bg-indigo-700 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-800 transition"
                style={{ minWidth: "120px" }}
              >
                shopping cart{" "}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Banner Section */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-lg">
        <img
          src="images/pexels-karolina-grabowska-5632346.jpg" // ← غيّر هذا المسار إلى صورة البانر الخاصة بك
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <button
            onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* قائمة الكاتيجوري */}
      <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex flex-col items-center justify-center border rounded-md py-6 bg-white text-gray-800 border-gray-300 hover:shadow transition
            ${
              cat.id === selectedCategory
                ? "border-indigo-500 shadow-lg ring-2 ring-indigo-300"
                : ""
            }`}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="object-contain h-24"
            />
            <span className="text-sm font-medium mt-2">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* عرض المنتجات */}
      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {categories.find((c) => c.id === selectedCategory)?.label} Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productData[selectedCategory]?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
              >
                <img
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4 cursor-pointer hover:scale-105 transition"
                />
                <h3 className="text-md font-semibold mb-1">{product.title}</h3>
                <p className="text-indigo-600 font-bold">
                  {product.price.toFixed(2)} EGP
                </p>
                <p className="text-yellow-500 text-sm mb-2">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </p>
                <button
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700 transition"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        img: product.image,
                        price: product.price,
                        categ: selectedCategory,
                        title: product.title,
                        desc: "",
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;

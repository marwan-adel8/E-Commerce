import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { addToCart } from "../Redux/appSlice";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

const Products = () => {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  const products = data?.data?.slice(0, 8) || [];

  // تعديل بيانات بعض المنتجات يدويًا
  const productOverrides = {
    1: {
      title: "Sports T-shirt",
      image: "/images/sport-t-shirt.jpg",
      price: 299.99,
      desc: "Comfortable sports T-shirt made of high-quality materials.",
    },
    4: {
      title: "Bluetooth headphones",
      image: "/images/ear-podes.jpg",
      price: 499.99,
      desc: "Bluetooth headphones with clear sound, stylish design and long battery life.",
    },
  };

  const modifiedProducts = products.map((product) =>
    productOverrides[product.id]
      ? { ...product, ...productOverrides[product.id] }
      : product
  );

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-6 relative">
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

      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6"
      >
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md text-left">
          Best Sales
        </h1>
        <div className="w-24 h-1 bg-indigo-500 mt-3 rounded-full animate-pulse ml-0"></div>
      </motion.div>

      {/* أزرار التمرير */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow hover:bg-indigo-700 z-10"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow hover:bg-indigo-700 z-10"
        >
          <FaArrowRight />
        </button>

        {/* المنتجات */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 scrollbar-hide scroll-smooth py-2"
        >
          {modifiedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="min-w-[250px] max-w-[250px] h-[250px] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: { product },
                })
              }
            >
              <div className="w-full h-28 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-24 transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-2 flex flex-col justify-between flex-1">
                <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between text-xs text-gray-700 mb-1">
                  <span className="text-indigo-600 font-bold">
                    ${product.price}
                  </span>
                  <span className="text-yellow-500">
                    ⭐ {product.rating?.rate} ({product.rating?.count})
                  </span>
                </div>
                <button
                  className="flex items-center justify-center gap-1 text-xs w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      addToCart({
                        id: product.id,
                        img: product.image,
                        price: product.price,
                        categ: product.category,
                        title: product.title,
                        desc: product.description || product.desc || "",
                        quantity: 1,
                      })
                    );
                    setShowMessage(true);
                  }}
                >
                  <FaShoppingCart className="text-sm" />
                  Add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

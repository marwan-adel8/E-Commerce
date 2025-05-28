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
      image: "/public/images/sport-t-shirt.jpg",
      price: 299.99,
      desc: "Comfortable sports T-shirt made of high-quality materials.",
    },
    4: {
      title: "Bluetooth headphones",
      image: "/public/images/ear-podes.jpg",
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-6">
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
                {/* <p className="text-xs text-gray-600 line-clamp-2 mb-2">
  {product.description || product.desc || ""}
</p> */}

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
                    setTimeout(() => setShowMessage(false), 2000);
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

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/appSlice"; // عدل المسار لو مختلف
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product); // لو في product في location.state مش محتاج تحميل
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!product) {
      // لو مش موجود المنتج في state، نجيب بيانات من API
      async function fetchProduct() {
        try {
          setLoading(true);
          // غير الرابط ده حسب API الخاص بك
          const res = await fetch(`https://your-api/products/${id}`);
          if (!res.ok) throw new Error("Failed to fetch product");
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }

      fetchProduct();
    }
  }, [id, product]);

  if (loading) {
    return (
      <div className="p-6 text-center mt-24">
        <h2 className="text-xl font-semibold mb-4">Loading product details...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center mt-24">
        <h2 className="text-xl font-semibold mb-4">Product not found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen mt-24 max-w-7xl mx-auto">
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

      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <Link to="/" className="text-indigo-600 hover:underline">
          Home
        </Link>{" "}
        &lt; {product.title}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Back to Shop
      </button>

      <div className="flex flex-col md:flex-row gap-12">
        {/* صورة المنتج */}
        <div className="flex-1 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-sm mx-auto rounded-lg shadow object-contain"
            style={{ maxHeight: "350px" }}
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-indigo-600 text-2xl font-semibold mb-4">
            {product.price.toFixed(2)} EGP
          </p>
          <p className="mb-4">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>
          {/* عرض الوصف مع fallback */}
          <p className="text-gray-700 mb-4">
            {product.desc || product.description || "No description available."}
          </p>
          {product.details && (
            <p className="text-gray-500 text-sm italic">{product.details}</p>
          )}

          {/* اختيار الكمية */}
          <div className="flex items-center gap-2 mb-4">
            <label className="text-gray-700">Quantity:</label>
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.min(prev + 1, 99))}
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

          {/* أزرار إضافة للعربة وشراء */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              className="flex items-center justify-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id || id,
                    img: product.image,
                    price: product.price,
                    categ: product.category || "General",
                    title: product.title,
                    desc: product.description || product.desc || "No description available",
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

export default ProductDetails;

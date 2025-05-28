import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/appSlice"; // عدل المسار لو مختلف
import { FaShoppingCart } from "react-icons/fa";

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

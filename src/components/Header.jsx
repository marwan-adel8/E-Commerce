import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { LogOutUser } from "../Redux/appSlice";
import Swal from "sweetalert2";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.appReducer.UserInfo);

  const totalQuantity = useSelector((state) =>
    state.appReducer.products.reduce((acc, item) => acc + item.quantity, 0)
  );

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "هل تريد تسجيل الخروج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، تسجيل الخروج",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          dispatch(LogOutUser());
          Swal.fire({
            icon: "success",
            title: "تم تسجيل الخروج",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "حدث خطأ أثناء تسجيل الخروج",
            text: error.message,
          });
        });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img
            src="/images/379396_shop_icon.png"
            alt="logo"
            className="w-10 h-10"
          />
          <span className="text-indigo-600">Buy</span>
          <span className="text-gray-900">Online</span>
        </Link>

        {/* Search (desktop only) */}
        <div className="hidden md:flex items-center flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-grow px-4 py-2 border rounded-l-full focus:outline-indigo-500 border-gray-300"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-full hover:bg-indigo-700">
            <FaSearch />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
          <Link to="/Shoppage" className="hover:text-indigo-600">Categories</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {userInfo ? (
            <span className="text-gray-700 font-medium hidden md:inline">
              {userInfo.userName}
            </span>
          ) : (
            <Link to="/reg">
              <FaUser className="text-gray-700 hover:text-indigo-600 text-xl" />
            </Link>
          )}

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-gray-700 hover:text-indigo-600 text-xl" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>

          {userInfo && (
            <button onClick={handleLogOut}>
              <LuLogOut className="text-gray-700 hover:text-red-600 text-xl" />
            </button>
          )}

          {/* Hamburger icon for mobile */}
          <button
            className="md:hidden text-gray-700 text-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg px-6 py-5 space-y-5 border-t"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-indigo-500"
            />

            <Link
              to="/"
              className="block text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/Shoppage"
              className="block text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

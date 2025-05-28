import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { LogOutUser } from "../Redux/appSlice";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.appReducer.UserInfo);

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
          console.log("sign-out successful.");
          dispatch(LogOutUser());
          Swal.fire({
            icon: "success",
            title: "تم تسجيل الخروج",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log("An error happened.", error);
          Swal.fire({
            icon: "error",
            title: "حدث خطأ أثناء تسجيل الخروج",
            text: error.message,
          });
        });
    }
  };

  const totalQuantity = useSelector((state) =>
    state.appReducer.products.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <div>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-1">
            <img
              src="/public/images/379396_shop_icon.png"
              alt="logo"
              className="w-12 h-12"
            />
            <span className="text-indigo-600">Buy</span>
            <span className="text-gray-900">Online</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center w-full max-w-md mx-6">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-full border border-indigo-600">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}

          <div className="hidden md:flex gap-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/shop" className="hover:text-indigo-600 transition">
              Shop
            </Link>
            <Link to="/Shoppage" className="hover:text-indigo-600 transition">
              Categories
            </Link>
            <Link to="" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {userInfo ? (
              <span className="text-gray-700 font-medium">
                {userInfo.userName}
              </span>
            ) : (
              <Link to="/reg">
                <button className="text-gray-700 hover:text-indigo-600 text-lg cursor-pointer transition">
                  <FaUser size={20} />
                </button>
              </Link>
            )}

            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="text-gray-700 hover:text-indigo-600 text-lg transition" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>

            {userInfo && (
              <button onClick={handleLogOut}>
                <LuLogOut size={24} />
              </button>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-gray-700 text-xl focus:outline-none transition"
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-md px-4 py-6 space-y-4"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-indigo-500"
              />
              <a
                href="/"
                className="block text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                Home
              </a>
              <a
                href="/shop"
                className="block text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                Shop
              </a>
              <a
                href="/Shoppage"
                className="block text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                Categories
              </a>
              <a
                href="/"
                className="block text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                About
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Header;

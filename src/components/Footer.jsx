import {
  FaTruck,
  FaLock,
  FaCheckCircle,
  FaHeadset,
  FaFacebook,
  FaInstagram,
  FaLinkedin ,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-6">
      {/* Feature Section */}
<div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
        {/* Feature 1 */}
        <div className="flex items-center gap-3">
          <FaTruck className="text-coquelicot text-2xl" />
          <div>
            <h4 className="font-semibold text-base">Free Shipping</h4>
            <p className="text-sm text-gray-400">On orders over $50</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-3">
          <FaLock className="text-coquelicot text-2xl" />
          <div>
            <h4 className="font-semibold text-base">Secure Payment</h4>
            <p className="text-sm text-gray-400">100% secure checkout</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-coquelicot text-2xl" />
          <div>
            <h4 className="font-semibold text-base">Quality Guarantee</h4>
            <p className="text-sm text-gray-400">Product quality assured</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center gap-3">
          <FaHeadset className="text-coquelicot text-2xl" />
          <div>
            <h4 className="font-semibold text-base">24/7 Support</h4>
            <p className="text-sm text-gray-400">Dedicated support</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm border-t border-gray-800 pt-10">
        {/* Logo and brief */}
        <div>
          <h2 className="text-2xl font-bold text-coquelicot">ShopZone</h2>
          <p className="mt-3 text-gray-400">
            Your favorite place to shop all kinds of products with quality and trust.
          </p>
        </div>

        {/* Quick Links */}
       <ul className="space-y-2 text-gray-400">
  <li><Link to="/" className="hover:text-white">Home</Link></li>
  <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
  <li><Link to="/Shoppage" className="hover:text-white">Categories</Link></li>
  <li><Link to="" className="hover:text-white">Contact</Link></li>
</ul>


        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">FAQ</a></li>
            <li><a href="/" className="hover:text-white">Returns</a></li>
            <li><a href="/" className="hover:text-white">Shipping Info</a></li>
            <li><a href="/" className="hover:text-white">Support</a></li>
          </ul>
        </div>

        {/* Social */}
  <div>
  <h3 className="font-semibold mb-3">Follow Us</h3>
  <div className="flex gap-4 text-2xl text-gray-400">
    <a href="https://www.facebook.com/share/1AHavxyUiV/" target="_blank" rel="noopener noreferrer">
      <FaFacebook className="hover:text-coquelicot" />
    </a>
    <a href="https://www.instagram.com/el_sa_kaa/profilecard/?igsh=MXZnMHlqb3JvZnJ6eg==" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="hover:text-coquelicot" />
    </a>
   <a href="http://www.linkedin.com/in/marwan-elsaka-41ba70356" target="_blank" rel="noopener noreferrer">
  <FaLinkedin className="hover:text-coquelicot" />
</a>

    <a href="https://github.com/marwan-adel8" target="_blank" rel="noopener noreferrer">
      <FaGithub className="hover:text-coquelicot" />
    </a>
  </div>
</div>

      </div>

      {/* Bottom Text */}
      <div className="text-center mt-10 text-gray-500 text-sm border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} BuyOnline. All rights reserved.
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "mens", label: "Mens", image: "/images/mens-clothes.jpg" },
  { id: "woman", label: "Woman", image: "/images/woman.jpg" },
  { id: "smartwatch", label: "SmartWatch", image: "/images/watch.jpg" },
  { id: "phone", label: "Phone", image: "/images/phone.jpg" },
  { id: "tv", label: "TV", image: "/images/tv.jpg" },
  { id: "perfume", label: "Perfume", image: "/images/perfume.jpg" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleClick = (categoryId) => {
    navigate(`/Shoppage?category=${categoryId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
          Our Categories
        </h1>
        <div className="w-24 h-1 bg-indigo-500 mt-3 rounded-full animate-pulse"></div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`flex flex-col items-center justify-center border rounded-xl py-6 px-2 bg-white transition-all duration-300 border-gray-300 hover:shadow-md`}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="object-contain h-24 mb-2 rounded-md"
            />
            <span className="text-sm font-semibold text-gray-800">
              {cat.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

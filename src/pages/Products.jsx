import { useLoaderData } from "react-router-dom";

import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

import {addToCart} from "../Redux/appSlice"
import { useDispatch } from "react-redux";
const Products = () => {
  const data = useLoaderData();
  const products = data.data;
  const dispatch = useDispatch();
  console.log(products)

  return (
    <div className="container mx-auto px-4 py-10">
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative text-center mb-12"
>
  <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
    Our Products
  </h1>
  <div className="w-24 h-1 bg-indigo-500 mx-auto mt-3 rounded-full animate-pulse"></div>
</motion.div>


<div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white w-full h-[450px] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain h-full"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                <span className="text-indigo-600 font-bold">${product.price}</span>
                <span className="text-yellow-500">
                  ⭐ {product.rating?.rate} ({product.rating?.count})
                </span>
              </div>
              <button className="flex items-center justify-center gap-2 text-sm w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition"
            onClick={() =>
              dispatch(
                addToCart({
                  id : product.id,
                  img : product.image,
                  price : product.price,
                  categ : product.category,
                  title : product.title,
                  desc : product.description,
                  quantity : 1,
                })
                )
              }
              
              
              
              >
  <FaShoppingCart className="text-base" />
  {""}
  Add to cart {""}
</button>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;

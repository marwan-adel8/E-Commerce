import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Increament, decreament, removeAllCart, removeFromCart } from '../Redux/appSlice';

const Cart = () => {
  const products = useSelector((state) => state.appReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-800">🛒 Shopping Cart</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-xl p-4 flex gap-6 items-center"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-24 h-24 object-contain border rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-gray-800 mb-1">
                    {product.title.substring(0, 40)}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.desc.substring(0, 100)}...
                  </p>
                  <p className="text-indigo-600 font-bold mb-2">${product.price}</p>

                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => dispatch(Increament(product.id))}
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      +
                    </button>
                    <span className="font-semibold">{product.quantity}</span>
                    <button
                      onClick={() => dispatch(decreament(product.id))}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      -
                    </button>
                  </div>

                  <p className="text-gray-700 text-sm">
                    Subtotal: <span className="font-medium">${product.price * product.quantity}</span>
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="mt-3 inline-flex items-center gap-2 text-sm px-4 py-1.5 bg-red-100 text-red-600 border border-red-300 rounded hover:bg-red-200 transition"
                  >
                    🗑️ Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-10 border-t pt-6 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-800">
              Total: <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
            </p>
            <button
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
              onClick={() => dispatch(removeAllCart())}
            >
              🧹 Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

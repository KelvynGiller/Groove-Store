import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) || 0), 0);

  return (
    <div className="mt-12 mb-4 bg-[#242629] p-6 rounded-2xl shadow-lg w-[1600px] text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          <ul className="text-white">
            {cart.map((item, index) => (
              <li key={item.id || index} className="border border-gray-600 p-4 flex justify-between items-center rounded-lg bg-[#1E1E1E]">
                <div className="flex flex-col text-left">
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-gray-400 text-sm">by {item.artist}</p>
                  <p className="text-gray-500 text-xs">Category: {item.category}</p>
                  <p className="text-[#7F5AF0] font-semibold">${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-white text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button className="mt-4 w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

import React from "react";

const Cart = ({ cartItems = [] }) => {
  return (
    <div className="mt-12 mb-4 bg-[#242629] p-6 rounded-2xl shadow-lg w-[400px] text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <ul className="text-white">
          {cartItems.map((item) => (
            <li key={item.id} className="border-b border-gray-600 py-2">
              <p className="text-lg">{item.name}</p>
              <p className="text-[#7F5AF0] font-semibold">${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
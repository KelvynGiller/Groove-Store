import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) || 0), 0);

  return (
    <div className="mt-12 mb-4 bg-[#242629] p-6 rounded-2xl shadow-lg w-[800px] text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Checkout</h2>
      <ul className="text-white text-left">
        {cart.map((item, index) => (
          <li key={item.id || index} className="border-b border-gray-600 py-2 flex justify-between">
            <span>{item.name} - {item.artist} ({item.category})</span>
            <span className="text-[#7F5AF0] font-semibold">${item.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-white text-lg font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>
      <button className="mt-4 w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
import React from "react";
import { useCart } from "../context/CartContext";

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#16161A]">
      <div className="bg-[#242629] p-8 rounded-2xl shadow-lg w-[400px] text-center">
        <h2 className="text-white text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-400 text-lg mb-6">By {product.artist}</p>
        <p className="text-[#7F5AF0] text-xl font-semibold mb-6">
          ${product.price}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
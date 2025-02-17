import React from "react";
import { Link } from "react-router-dom";
import CoverImage from "./CoverImage"; // Certifique-se de que o caminho esteja correto

const ProductList = ({ products, showAll = false, onPlay }) => {
  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <div className="text-center py-12 bg-[#16161A]">
      <h2 className="text-white text-2xl font-Goldman mb-8">Music Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-16">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="relative mt-8 w-[323px] h-[220px] bg-[#242629] rounded-lg flex flex-col items-center justify-center"
          >
            <div className="absolute top-[-40px] w-[120px] h-[120px] bg-[#434343] rounded-full flex items-center justify-center overflow-hidden">
              <CoverImage songName={product.name} artistName={product.artist} />
            </div>
            <p className="mt-16 text-white font-semibold">{product.name}</p>
            <p className="text-gray-400 text-sm">{product.artist}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => onPlay(product.name, product.artist)}
                className="bg-[#2CB67D] text-white px-4 py-2 rounded-full text-sm"
              >
                Play
              </button>
              <Link
                to={`/product/${product.id}`}
                className="bg-[#7F5AF0] text-white px-4 py-2 rounded-full text-sm"
              >
                Buy
              </Link>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <div className="mt-8">
          <Link
            to="/products"
            className="bg-[#7F5AF0] text-white px-6 py-3 rounded-full text-lg"
          >
            See More
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductList;
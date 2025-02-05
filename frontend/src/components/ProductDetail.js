import React from "react";

const ProductDetail = ({ product }) => {
  return (
    <div>
      <h2>{product.name} - {product.artist}</h2>
      <p>Price: ${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
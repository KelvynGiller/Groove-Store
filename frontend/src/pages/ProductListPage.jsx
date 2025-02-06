import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h1>Available Music</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductListPage;
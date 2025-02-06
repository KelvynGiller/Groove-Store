import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetail from "../components/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
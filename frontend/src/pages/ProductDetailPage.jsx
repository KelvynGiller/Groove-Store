import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to load product details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-white p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
};

export default ProductDetailPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';
import ProductList from "../components/ProductList";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products`) 
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="pt-[101px]">
      <Header />
      <Home />
      <ProductList products={products} />
      <Footer />
    </div>
  );
};

export default HomePage;
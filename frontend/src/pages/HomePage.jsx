import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header';
import Home from '../components/Home'
import Footer from '../components/Footer';
import ProductList from "../components/ProductList";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/products") 
          .then(response => setProducts(response.data))
          .catch(error => console.error("Error fetching products:", error));
      }, []);


  return (
    
    <div>
      <Header />
      <Home />
      <ProductList products={products} />
      <Footer />
    </div>
  );
};

export default HomePage;

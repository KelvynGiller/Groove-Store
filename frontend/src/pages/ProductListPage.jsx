import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import AudioPlayer from "../components/AudioPlayer";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentSong, setCurrentSong] = useState({ songName: "", artistName: "" });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handlePlay = (songName, artistName) => {
    setCurrentSong({ songName, artistName });
  };

  return (
    <div className="relative min-h-screen pb-24">
      <Header />
      <ProductList products={products} showAll={true} onPlay={handlePlay} />
      <Footer />
      <AudioPlayer
        songName={currentSong.songName}
        artistName={currentSong.artistName}
      />
    </div>
  );
};

export default ProductsPage;
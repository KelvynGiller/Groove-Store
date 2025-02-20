import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import AudioPlayer from "../components/AudioPlayer";

const GenresPage = () => {
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentSong, setCurrentSong] = useState({ songName: "", artistName: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const prods = response.data;
        setProducts(prods);
        const uniqueGenres = ["All", ...new Set(prods.map(product => product.category))];
        setGenres(uniqueGenres);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = selectedGenre === "All"
    ? products
    : products.filter(product => product.category === selectedGenre);

    const handlePlay = (songName, artistName) => {
        setCurrentSong({ songName, artistName });
      };
    

  return (
    <div>
      <Header />
      <div className="flex bg-[#16161A]">
        <aside className="w-1/8 p-6 text-white border-r border-gray-700">
          <h3 className="text-xl font-bold mb-4">Filter by Genre</h3>
          <ul>
            {genres.map((genre, index) => (
              <li
                key={index}
                className={`cursor-pointer py-2 ${selectedGenre === genre ? "text-[#7F5AF0]" : "text-white"}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-3/4">
          <ProductList products={filteredProducts} showAll={true} onPlay={handlePlay} />
        </main>
      </div>
      <Footer />
      <AudioPlayer
        songName={currentSong.songName}
        artistName={currentSong.artistName}
      />
    </div>
  );
};

export default GenresPage;
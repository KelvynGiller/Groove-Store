import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import AudioPlayer from "../components/AudioPlayer";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ArtistsPage = () => {
  const [products, setProducts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("All");
  const [currentSong, setCurrentSong] = useState({ songName: "", artistName: "" });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((response) => {
        const prods = response.data;
        setProducts(prods);
        const uniqueArtists = ["All", ...new Set(prods.map(product => product.artist))];
        setArtists(uniqueArtists);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = selectedArtist === "All"
    ? products
    : products.filter(product => product.artist === selectedArtist);

    const handlePlay = (songName, artistName) => {
        setCurrentSong({ songName, artistName });
      };

  return (
    <div>
      <Header />
      <div className="flex bg-[#16161A]">
        <aside className="w-1/8 p-6 text-white border-r border-gray-700">
          <h3 className="text-xl font-bold mb-4">Filter by Artist</h3>
          <ul>
            {artists.map((artist, index) => (
              <li
                key={index}
                className={`cursor-pointer py-2 ${selectedArtist === artist ? "text-[#7F5AF0]" : "text-white"}`}
                onClick={() => setSelectedArtist(artist)}
              >
                {artist}
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

export default ArtistsPage;
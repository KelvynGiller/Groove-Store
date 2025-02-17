import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const ArtistsPage = () => {
  const [products, setProducts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const prods = response.data;
        setProducts(prods);
        // Cria uma lista única de artistas e adiciona a opção "All"
        const uniqueArtists = ["All", ...new Set(prods.map(product => product.artist))];
        setArtists(uniqueArtists);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Se "All" estiver selecionado, mostra todos os produtos; caso contrário, filtra por artista
  const filteredProducts = selectedArtist === "All"
    ? products
    : products.filter(product => product.artist === selectedArtist);

  return (
    <div>
      <Header />
      <div className="flex bg-[#16161A]">
        {/* Sidebar de filtro */}
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

        {/* Área principal com os produtos filtrados */}
        <main className="w-3/4">
          <ProductList products={filteredProducts} showAll={true} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistsPage;
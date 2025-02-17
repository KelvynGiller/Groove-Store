import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const GenresPage = () => {
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

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
          <ProductList products={filteredProducts} showAll={true} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default GenresPage;
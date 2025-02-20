import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await getIdToken(currentUser);
        const response = await fetch(`${API_BASE_URL}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setMessage(data.message);
      } else {
        setUser(null);
        setMessage("User not authorized");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#16161A] text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold mb-4">
          {user ? `Hello, ${user.displayName || user.email}` : "Loading..."}
        </h1>
        <p className="text-gray-400 mb-6">{message}</p>
        <Link
          to="/products"
          className="bg-[#7F5AF0] text-white px-6 py-3 rounded-lg hover:bg-[#6A47D5] transition"
        >
          Browse Musics
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
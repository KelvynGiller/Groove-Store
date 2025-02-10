import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await getIdToken(currentUser);
        const response = await fetch("http://localhost:3000/api/protected", {
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
    <div>
      <Header />
      <h1>{user ? `Hello, ${user.displayName || user.email}` : "Loading..."}</h1>
      <p>{message}</p>
      <Link to="/products">Browse musics</Link>
      <Footer />
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(); 
    const unsubscribe = onAuthStateChanged(auth, setUser); 
    return () => unsubscribe(); 
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth); 
  };

  return (
    <header className="header">
      <h1>Groove Store</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Musics</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
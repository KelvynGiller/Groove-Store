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
<header className="w-full h-[101px] bg-black flex items-center justify-between px-8 fixed top-0 left-0 z-10">
  <h1 className="text-white text-[20px] font-normal leading-[24px] font-[Goldman]">
    Groove Store
  </h1>
  <nav className="flex space-x-6">
    <Link to="/" className="text-white text-[14px] font-[Golos Text]">
      Home
    </Link>
    <Link to="/products" className="text-white text-[14px] font-[Golos Text]">
      Tracks
    </Link>
    <Link to="/genres" className="text-white text-[14px] font-[Golos Text]">
      Genres
    </Link>
    <Link to="/artists" className="text-white text-[14px] font-[Golos Text]">
      Artists
    </Link>
    <Link to="/cart" className="text-white text-[14px] font-[Golos Text]">
      Cart
    </Link>
  </nav>
  <div className="flex space-x-6">
    {user ? (
      <button onClick={handleLogout} className="text-white text-[18px] font-[Goldman]">
        Logout
      </button>
    ) : (
      <>
        <Link to="/login" className="text-white text-[18px] font-[Goldman]">
          Login
        </Link>
        <Link to="/register" className="text-white text-[18px] font-[Goldman]">
          Register
        </Link>
      </>
    )}
  </div>
</header>

  );
};

export default Header;
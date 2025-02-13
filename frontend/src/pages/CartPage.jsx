import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items || []);
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-[#16161A]">
        <Cart cartItems={cart} />
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

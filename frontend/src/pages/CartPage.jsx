import React from "react";
import Header from "../components/Header";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart } = useCart();

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
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"; 

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
      <Header />
      <main className="flex-1 flex justify-center items-center p-6">
        <div className="bg-[#242629] p-6 rounded-2xl shadow-lg w-[500px] mx-auto text-center mt-20">
          <h2 className="text-white text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-300 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
          <button
            onClick={() => navigate("/orderhistory")}
            className="bg-[#7F5AF0] hover:bg-[#6A47D5] text-white p-3 rounded-md mt-4"
          >
            View Order History
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { processPayment } from "../slices/CheckoutSlice";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) {
      alert("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    try {
      await dispatch(processPayment({
        orderId: "any_orderId", 
        amount: 1000,          
        paymentInfo: { cardNumber, expiry, cvc }
      })).unwrap();
      alert("Payment successful!");
      navigate("/success");
    } catch (err) {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handlePayment} className="bg-[#242629] p-6 rounded-lg">
      <h2 className="text-white text-xl font-bold mb-4">Payment Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full bg-[#16161A] text-white p-2 rounded-md"
          placeholder="Card Number"
        />
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full bg-[#16161A] text-white p-2 rounded-md"
          placeholder="MM/YY"
        />
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className="w-full bg-[#16161A] text-white p-2 rounded-md"
          placeholder="CVC"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
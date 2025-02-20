import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CheckoutForm = ({ orderId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
  
    setLoading(true);
  
    const amountInCents = Math.round(parseFloat(amount) * 100);
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkout/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount: amountInCents }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(`Payment Error: ${errorResponse.message || "Unknown Error"}`);
        setLoading(false);
        return;
      }
  
      const { clientSecret } = await response.json();
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
  
      if (result.error) {
        alert("Payment Failed: " + result.error.message);
      } else {
        alert("Successful payment!");
        navigate("/success");
      }
    } catch (err) {
      alert("Payment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <form onSubmit={handlePayment} className="bg-[#242629] p-6 rounded-lg">
      <h2 className="text-white text-xl font-bold mb-4">Payment details</h2>
      <div className="bg-[#16161A] p-4 rounded-md">
        <CardElement className="text-white" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition mt-4"
      >
        {loading ? "Processing..." : "Pay now!"}
      </button>
    </form>
  );
};

export default CheckoutForm;

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      console.log("Payment successful", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-md">
      <CardElement className="p-3 bg-white rounded-md" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
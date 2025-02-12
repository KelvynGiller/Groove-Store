import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ orderId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
            currency: "usd",
            order_id: orderId,
          }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (amount > 0) {
      fetchPaymentIntent();
    }
  }, [amount, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Pagamento bem-sucedido!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-md">
      <CardElement className="p-3 bg-white rounded-md" />
      <button
        type="submit"
        disabled={!stripe || loading || !clientSecret}
        className="mt-4 w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-2 text-white">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
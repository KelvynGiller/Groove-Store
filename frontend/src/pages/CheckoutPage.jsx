import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`);
      const data = await response.json();
      setOrderDetails(data);
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="mt-12 mb-4 bg-[#242629] p-6 rounded-2xl shadow-lg w-[800px] text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Checkout</h2>
      
      {orderDetails ? (
        <>
          <ul className="text-white text-left">
            {orderDetails.cart.map((item, index) => (
              <li key={item.id || index} className="border-b border-gray-600 py-2 flex justify-between">
                <span>{item.name} - {item.artist} ({item.category})</span>
                <span className="text-[#7F5AF0] font-semibold">${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-white text-lg font-bold">
            Total: ${orderDetails.totalPrice.toFixed(2)}
          </div>
          <CheckoutForm orderId={orderId} amount={orderDetails.totalPrice} />
        </>
      ) : (
        <p className="text-gray-400">Loading order details...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
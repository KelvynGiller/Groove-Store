import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchOrderDetails, clearCheckout } from '../slices/CheckoutSlice';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [token, setToken] = useState(null);
  const { order, status, error } = useSelector((state) => state.checkout);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const t = await user.getIdToken();
          setToken(t);
          console.log("CheckoutPage token:", t);
        } catch (err) {
          console.error("Failed to get token:", err);
        }
      } else {
        console.log("Please login!");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (orderId && token) {
      console.log("Dispatching fetchOrderDetails with orderId:", orderId, "and token:", token);
      dispatch(fetchOrderDetails({ orderId, token }))
        .unwrap()
        .then((data) => {
          console.log("Fetched order details:", data);
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
        });
    } else {
      console.log("OrderId or Token unavailable:", orderId, token);
    }
    return () => {
      dispatch(clearCheckout());
    };
  }, [dispatch, orderId, token]);

  useEffect(() => {
  }, [order]);

  if (status === 'loading') {
    return <div className="text-white p-8">Loading order details...</div>;
  }
  
  if (status === 'failed') {
    const errorMessage = typeof error === 'object' ? error.message : error;
    return <div className="text-red-500 p-8">Error: {errorMessage}</div>;
  }
  
  if (!order) {
    return <div className="text-gray-400 p-8">Order details unavailable.</div>;
  }

  return (
    <div className="mt-12 mb-4 bg-[#242629] p-6 rounded-2xl shadow-lg w-[800px] text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Checkout</h2>
      <ul className="text-white text-left">
  {order?.items && order.items.length > 0 ? (
    order.items.map((item, index) => {
      return (
        <li key={item.product_id || index} className="border-b border-gray-600 py-2 flex justify-between">
          <span>{item.name} - {item.artist} ({item.genre})</span>
          <span className="text-[#7F5AF0] font-semibold">
            ${parseFloat(item.price || 0).toFixed(2)}
          </span>
        </li>
      );
    })
  ) : (
    <li className="text-gray-400">Items not found.</li>
  )}
</ul>
      <div className="mt-4 text-white text-lg font-bold">
        Total: ${parseFloat(order.total_price || 0).toFixed(2)}
      </div>
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
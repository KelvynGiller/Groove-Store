import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchOrderDetails, clearCheckout } from '../slices/CheckoutSlice';
import CheckoutForm from '../components/CheckoutForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
        } catch (err) {
          console.error("Failed to get token:", err);
        }
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (orderId && token) {
      dispatch(fetchOrderDetails({ orderId, token }))
        .unwrap()
        .catch((err) => {
          console.error("Error fetching order details:", err);
        });
    }
    return () => {
      dispatch(clearCheckout());
    };
  }, [dispatch, orderId, token]);

  if (status === 'loading') {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (status === 'failed') {
    const errorMessage = typeof error === 'object' ? error.message : error;
    return <div className="text-red-500 p-8">Erro: {errorMessage}</div>;
  }

  if (!order || !order.id || !order.total_price) {
    return <div className="text-gray-400 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
      <Header />
      <main className="flex-1 flex justify-center items-center p-6">
        <div className="bg-[#242629] p-6 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Checkout</h2>
          <ul className="text-white text-left">
            {order?.items?.length > 0 ? (
              order.items.map((item, index) => (
                <li key={item.product_id || index} className="border-b border-gray-600 py-2 flex justify-between">
                  <span>{item.name} - {item.artist} ({item.genre})</span>
                  <span className="text-[#7F5AF0] font-semibold">
                    ${parseFloat(item.price || 0).toFixed(2)}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">Cart is empty</li>
            )}
          </ul>
          <div className="mt-4 text-white text-lg font-bold">
            Total: ${parseFloat(order.total_price || 0).toFixed(2)}
          </div>
          
          <CheckoutForm orderId={order.id} amount={order.total_price} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

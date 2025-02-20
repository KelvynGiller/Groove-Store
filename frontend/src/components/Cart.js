import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, fetchCart } from '../slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [token, setToken] = useState(null);

  const cart_id = useSelector((state) => state.cart.cart_id);
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken()
          .then((t) => {
            setToken(t);
            console.log('Token in Cart component:', t);
          })
          .catch((err) => console.error('Failed to get token:', err));
      } else {
        setToken(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (currentUser && token && items.length === 0) {
      console.log('Dispatching fetchCart with:', currentUser.uid, token);
      dispatch(fetchCart({ userId: currentUser.uid, token }))
        .catch((err) => {
          console.error('Failed to fetch cart:', err);
        });
    }
  }, [dispatch, currentUser, token, items.length]);

  const handleRemoveFromCart = (productId) => {
    if (!currentUser || !token) {
      alert('User not authenticated');
      return;
    }
    dispatch(removeFromCart({ userId: currentUser.uid, product_id: productId, token }))
      .then(() => {
        alert('Item removed from cart!');
      })
      .catch((err) => {
        console.error('Failed to remove item:', err);
        alert('Failed to remove item from cart');
      });
  };

  const handleProceedToCheckout = async () => {
    if (!cart_id) {
      console.error("Cart not fount!");
      return;
    }
    try {
      const orderResponse = await axios.post(`${API_BASE_URL}/orders`, {
        user_id: currentUser.uid,
        cart_id: cart_id,
        total_price: totalAmount,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { id: orderId } = orderResponse.data;
      await axios.post(`${API_BASE_URL}/orders/${orderId}/items`, {
        items: items.map(item => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/checkout/${orderId}`);
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (currentUser === undefined) {
    return <div className="text-white p-8">Loading user authentication...</div>;
  }

  if (!currentUser) {
    return <div className="text-white p-8">User not authenticated.</div>;
  }

  if (status === 'failed') {
    const errorMessage = typeof error === 'object' ? error.message : error;
    return <div className="text-red-500 p-8">Erro: {errorMessage}</div>;
  }

  return (
    <div className="bg-[#16161A] min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.product_id}
                className="bg-[#242629] p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-white text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-400">Artist: {item.artist}</p>
                  <p className="text-gray-400">Genre: {item.genre}</p>
                  <p className="text-[#7F5AF0]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.product_id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-right">
            <h2 className="text-white text-2xl font-bold">
              Total: ${totalAmount.toFixed(2)}
            </h2>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleProceedToCheckout}
              className="bg-[#7F5AF0] text-white px-6 py-3 rounded-md hover:bg-[#6A47D5] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      {status === 'loading' && (
        <div className="text-white p-8">Loading cart...</div>
      )}
    </div>
  );
};

export default Cart;
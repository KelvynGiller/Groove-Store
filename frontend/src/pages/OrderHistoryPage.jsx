import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderHistory from "../components/OrderHistory";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken().then((t) => {
          setToken(t);
          console.log("Token in OrderHistoryPage component:", t);
        }).catch((err) => {
          console.error("Failed to get token:", err);
        });
      } else {
        setToken(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser || !token) return;

      try {
        const userId = currentUser.uid;
        const response = await axios.get(`/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
        <Header />
        <main className="flex-1 flex justify-center items-center p-6">
          <div className="text-white">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
      <Header />
      <main className="flex-1 flex justify-center items-center p-6">
        <OrderHistory orders={orders} />
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;

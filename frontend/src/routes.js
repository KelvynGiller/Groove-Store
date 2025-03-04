import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Dashboard from './pages/DashboardPage';
import SuccessPage from './pages/SuccessPage';
import OrderHistory from './pages/OrderHistoryPage';
import ArtistsPage from './pages/ArtistsPage';
import GenresPage from './pages/GenresPage';
import PrivateRoute from './components/Private Route/PrivateRoute';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/artists" element={<ArtistsPage />} /> 
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/cart" element={<PrivateRoute element={CartPage} />} />
        <Route path="/checkout/:orderId" element={<PrivateRoute element={CheckoutPage} />} />
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="/orderhistory" element={<PrivateRoute element={OrderHistory} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
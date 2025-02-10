import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
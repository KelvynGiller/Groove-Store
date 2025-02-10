import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  return (
    <div>
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default RegisterPage;
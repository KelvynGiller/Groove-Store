import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterLink from '../components/Auth/RegisterLink';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Login to the Groove Store</h1>
      <LoginForm />
      <RegisterLink />
    </div>
  );
};

export default LoginPage;
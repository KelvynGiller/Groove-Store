import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import LoginLink from '../components/Auth/LoginLink';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <h1>Create your account</h1>
      <RegisterForm />
      <LoginLink />
    </div>
  );
};

export default RegisterPage;
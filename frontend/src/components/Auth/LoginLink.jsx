import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = () => {
  return (
    <p>
      Already have an account? <Link to="/login">Login here</Link>.
    </p>
  );
};

export default LoginLink;
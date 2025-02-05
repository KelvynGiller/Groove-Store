import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLink = () => {
  return (
    <p>
      Don't have an account? <Link to='/register'>Register here</Link>
    </p>
  );
};

export default RegisterLink;
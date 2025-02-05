import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
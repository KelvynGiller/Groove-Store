import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container); 


root.render(
  <Auth0Provider
    domain="https://dev-nkmpsk84coa8e0u4.us.auth0.com" 
    clientId="1AtveOUk4TvXi6kC7G7hDTMViovqLz3d"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { auth } from "./utils/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import './App.css';
import StripeProvider from "./services/StripeProvider";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User authenticated", user);
  } else {
    console.log("User unauthenticated");
  }
});


const container = document.getElementById('root');
const root = createRoot(container); 


root.render(
  <StripeProvider>
    <App />
  </StripeProvider>
);
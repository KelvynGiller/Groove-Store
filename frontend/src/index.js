import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { auth } from "./utils/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário autenticado:", user);
  } else {
    console.log("Nenhum usuário autenticado");
  }
});


const container = document.getElementById('root');
const root = createRoot(container); 


root.render(
    <App />
);
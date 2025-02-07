import React, { useState } from "react";
import { register } from "../../services/authService";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user = await register(email, password);
    if (user) alert("Conta criada com sucesso!");
  };

  return (
    <div>
      <h2>Registro</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default RegisterForm;
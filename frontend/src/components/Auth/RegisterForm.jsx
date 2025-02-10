import React, { useState } from "react";
import {Link} from "react-router-dom";
import { register } from "../../services/authService";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user = await register(email, password);
    if (user) alert("Conta criada com sucesso!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#16161A]">
      <div className="bg-[#242629] p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-white text-2xl font-bold mb-6">Create an Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-[#1F1F1F] text-white rounded-md outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-[#1F1F1F] text-white rounded-md outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          onClick={handleRegister}
          className="w-full bg-[#7F5AF0] text-white p-3 rounded-md hover:bg-[#6A47D5] transition"
        >
          Register
        </button>
        <p className="mt-4 text-gray-400">
          Already have an account? <Link className="text-gray-200" to="/login">Login here</Link>.
       </p>
      </div>
    </div>
  );
};

export default RegisterForm;
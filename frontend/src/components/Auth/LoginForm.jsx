import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error during login. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error during Google login.");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#16161A]">
      <div className="w-[400px] bg-[#242629] p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-white font-Goldman text-2xl mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-[#16161A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F5AF0]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-[#16161A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F5AF0]"
        />

        <button 
          onClick={handleLogin} 
          className="w-full bg-[#7F5AF0] text-white py-3 rounded-lg font-bold hover:bg-[#6842c2] transition">
          Log In
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition">
          Log In with Google
        </button>

        <p className="mt-4 text-gray-400">
      Don't have an account? <Link className="text-gray-200" to='/register'>Register here</Link>
        </p>
      </div>

    </div>
  );
};

export default LoginForm;

// src/components/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const UserLogin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginWithEmail = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      alert("Successfully logged in!");
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
    } catch (error) {
      alert("Google login error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
      {/* 3D Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-48 h-48 bg-white/10 rounded-full top-1/4 left-1/4 animate-float"></div>
        <div className="absolute w-64 h-64 bg-white/10 rounded-full top-1/2 left-1/2 animate-float animation-delay-2000"></div>
        <div className="absolute w-32 h-32 bg-white/10 rounded-full top-1/3 right-1/4 animate-float animation-delay-4000"></div>
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 animate-fade-in">
          User Login
        </h2>
        <form onSubmit={loginWithEmail} className="space-y-6">
          <div className="animate-slide-in-left">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="userEmail"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="animate-slide-in-right">
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="userPassword"
              placeholder="Enter your password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-lg animate-fade-in-up"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 animate-fade-in-up">
          <button
            onClick={loginWithGoogle}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-lg"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
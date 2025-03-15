// src/components/Logout.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const UserLogout = () => {
  const performLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out successfully!");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-end p-4">
      <button
        onClick={performLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:shadow-md"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserLogout;
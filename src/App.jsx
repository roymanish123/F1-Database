// src/App.jsx
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Driver from "./components/Driver";
import AddDriver from "./components/AddDriver";
import EditDriver from "./components/EditDriver"; // Import the EditDriver component

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">F1 App</h1>
            {user && <Logout />}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/drivers" /> : <Login />}
            />
            <Route
              path="/drivers"
              element={user ? <Driver /> : <Navigate to="/" />}
            />
            <Route
              path="/add-driver"
              element={user ? <AddDriver /> : <Navigate to="/" />}
            />
            {/* Add a route for the EditDriver page */}
            <Route
              path="/edit-driver/:id"
              element={user ? <EditDriver /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
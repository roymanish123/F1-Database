// src/App.jsx
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Driver from "./components/Driver";
import AddDriver from "./components/AddDriver";
import EditDriver from "./components/EditDriver";
import AddTeam from "./components/AddTeam";
import Teams from "./components/Teams";
import QueryDrivers from "./components/QueryDrivers";
import QueryTeams from "./components/QueryTeam";
import DriverDetails from "./components/DriverDetails";
import CompareDrivers from "./components/CompareDrivers";
import CompareTeams from "./components/CompareTeams";

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
            {/* Conditionally render Logout or Login button */}
            {user ? (
              <Logout />
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md">
                  Login
                </button>
              </Link>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            {/* Root path redirects to Drivers page */}
            <Route path="/" element={<Driver />} />

            {/* Login Page */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />

            {/* Driver Pages */}
            <Route
              path="/add-driver"
              element={user ? <AddDriver /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-driver/:id"
              element={user ? <EditDriver /> : <Navigate to="/login" />}
            />

            {/* Team Pages */}
            <Route
              path="/add-team"
              element={user ? <AddTeam /> : <Navigate to="/login" />}
            />
            <Route path="/teams" element={<Teams />} />

            {/* Query Pages */}
            <Route path="/query-drivers" element={<QueryDrivers />} />
            <Route path="/query-teams" element={<QueryTeams />} />

            {/* Driver Details */}
            <Route path="/driver-details/:id" element={<DriverDetails />} />

            {/* Comparison Pages */}
            <Route path="/compare-drivers" element={<CompareDrivers />} />
            <Route path="/compare-teams" element={<CompareTeams />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
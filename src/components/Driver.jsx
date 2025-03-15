import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch drivers from Firestore
  useEffect(() => {
    const fetchDrivers = async () => {
      const querySnapshot = await getDocs(collection(db, "drivers"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDrivers(data);
    };
    fetchDrivers();
  }, []);

  // Function to handle deleting a driver
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "drivers", id));
      alert("Driver deleted successfully!");
      setDrivers(drivers.filter((driver) => driver.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/edit-driver/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Drivers</h2>
        <div className="flex space-x-4 mb-6">
          {user && (
            <Link to="/add-driver">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105">
                Add New Driver
              </button>
            </Link>
          )}
          <Link to="/add-team">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 transform hover:scale-105">
              Add New Team
            </button>
          </Link>
          <Link to="/teams">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 transform hover:scale-105">
              View Teams
            </button>
          </Link>
          <Link to="/query-drivers">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 transform hover:scale-105">
              Query Drivers
            </button>
          </Link>
          <Link to="/query-teams">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 transform hover:scale-105">
              Query Teams
            </button>
          </Link>
          {/* Compare Drivers Button */}
          <Link to="/compare-drivers">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
              Compare Drivers
            </button>
          </Link>
          {/* Compare Teams Button */}
          <Link to="/compare-teams">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 transform hover:scale-105">
              Compare Teams
            </button>
          </Link>
        </div>
        <ul className="space-y-4">
          {drivers.map((driver) => (
            <li key={driver.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={`/driver-details/${driver.id}`} className="block">
                <div>
                  <strong className="text-lg text-gray-800">{driver.name}</strong>
                  <p className="text-sm text-gray-600">
                    Age: {driver.age}, Team: {driver.team}, Pole Positions: {driver.totalPolePositions}, Race Wins: {driver.totalRaceWins}, Points: {driver.totalPointsScored}, World Titles: {driver.totalWorldTitles}, Fastest Laps: {driver.totalFastestLaps}
                  </p>
                </div>
              </Link>
              {user && (
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(driver.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 transform hover:scale-110"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 transform hover:scale-110"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Driver;
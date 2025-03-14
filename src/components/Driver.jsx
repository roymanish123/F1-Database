// src/components/Driver.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  // Fetch drivers from Firestore
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "drivers"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      }
    };

    fetchDrivers();
  }, []);

  // Function to handle deleting a driver
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "drivers", id));
      alert("Driver deleted successfully!");
      // Refresh the list of drivers after deletion
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Drivers</h2>
        <Link to="/add-driver">
          <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add New Driver
          </button>
        </Link>
        <ul className="space-y-4">
          {drivers.map((driver) => (
            <li
              key={driver.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <strong className="text-lg text-gray-800">{driver.name}</strong>
                <p className="text-sm text-gray-600">
                  Age: {driver.age}, Team: {driver.team}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(driver.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(driver.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Driver;
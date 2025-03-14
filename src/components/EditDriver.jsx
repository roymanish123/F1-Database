// src/components/EditDriver.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const EditDriver = () => {
  const { id } = useParams(); // Get the driver ID from the URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("");

  // Fetch the driver's current data
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const driverDoc = await getDoc(doc(db, "drivers", id));
        if (driverDoc.exists()) {
          const driverData = driverDoc.data();
          setName(driverData.name);
          setAge(driverData.age);
          setTeam(driverData.team);
        } else {
          alert("Driver not found!");
          navigate("/drivers");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchDriver();
  }, [id, navigate]);

  // Function to handle updating the driver
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "drivers", id), {
        name,
        age: parseInt(age),
        team,
      });
      alert("Driver updated successfully!");
      navigate("/drivers");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Driver</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter driver's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter driver's age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="team" className="block text-sm font-medium text-gray-700">
              Team
            </label>
            <input
              type="text"
              id="team"
              placeholder="Enter driver's team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDriver;
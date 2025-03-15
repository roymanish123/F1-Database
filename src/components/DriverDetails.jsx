// src/components/DriverDetails.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

const DriverDetails = () => {
  const { id } = useParams(); // Get the driver ID from the URL
  const [driver, setDriver] = useState(null);

  // Fetch driver details from Firestore
  useEffect(() => {
    const fetchDriver = async () => {
      const driverRef = doc(db, "drivers", id);
      const driverSnap = await getDoc(driverRef);
      if (driverSnap.exists()) {
        setDriver(driverSnap.data());
      } else {
        alert("Driver not found!");
      }
    };
    fetchDriver();
  }, [id]);

  if (!driver) {
    return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Driver Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{driver.name}</h3>
          <p className="text-sm text-gray-600">
            <strong>Age:</strong> {driver.age}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Team:</strong> {driver.team}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Pole Positions:</strong> {driver.totalPolePositions}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Race Wins:</strong> {driver.totalRaceWins}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Points Scored:</strong> {driver.totalPointsScored}
          </p>
          <p className="text-sm text-gray-600">
            <strong>World Titles:</strong> {driver.totalWorldTitles}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Fastest Laps:</strong> {driver.totalFastestLaps}
          </p>
          <Link
            to="/drivers"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Drivers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
// src/components/CompareDrivers.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const CompareDrivers = () => {
  const [drivers, setDrivers] = useState([]); // List of all drivers
  const [driver1, setDriver1] = useState(null); // Selected driver 1
  const [driver2, setDriver2] = useState(null); // Selected driver 2
  const [error, setError] = useState(""); // Error message

  // Fetch all drivers from Firestore
  useEffect(() => {
    const fetchDrivers = async () => {
      const querySnapshot = await getDocs(collection(db, "drivers"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDrivers(data);
    };
    fetchDrivers();
  }, []);

  // Function to handle driver selection
  const handleDriverSelect = (e, setDriver) => {
    const selectedDriver = drivers.find((driver) => driver.id === e.target.value);
    setDriver(selectedDriver);

    // Reset error message
    setError("");
  };

  // Function to determine the better stat
  const getBetterStat = (stat1, stat2, isAge = false) => {
    if (isAge) {
      return stat1 < stat2 ? "bg-green-200" : "";
    }
    return stat1 > stat2 ? "bg-green-200" : "";
  };

  // Validate if the same driver is selected
  useEffect(() => {
    if (driver1 && driver2 && driver1.id === driver2.id) {
      setError("You cannot compare the same driver. Please select a different driver.");
      setDriver2(null); // Reset the second driver selection
    }
  }, [driver1, driver2]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Compare Drivers</h2>
        <div className="flex space-x-4 mb-6">
          {/* Dropdown for Driver 1 */}
          <div className="flex-1">
            <label htmlFor="driver1" className="block text-sm font-medium text-gray-700">
              Select Driver 1
            </label>
            <select
              id="driver1"
              onChange={(e) => handleDriverSelect(e, setDriver1)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown for Driver 2 */}
          <div className="flex-1">
            <label htmlFor="driver2" className="block text-sm font-medium text-gray-700">
              Select Driver 2
            </label>
            <select
              id="driver2"
              onChange={(e) => handleDriverSelect(e, setDriver2)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {/* Comparison Table */}
        {driver1 && driver2 && !error && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparison</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Stat</th>
                  <th className="py-2">{driver1.name}</th>
                  <th className="py-2">{driver2.name}</th>
                </tr>
              </thead>
              <tbody>
                {/* Age */}
                <tr className="border-b">
                  <td className="py-2">Age</td>
                  <td className={`py-2 ${getBetterStat(driver1.age, driver2.age, true)}`}>
                    {driver1.age}
                  </td>
                  <td className={`py-2 ${getBetterStat(driver2.age, driver1.age, true)}`}>
                    {driver2.age}
                  </td>
                </tr>
                {/* Pole Positions */}
                <tr className="border-b">
                  <td className="py-2">Pole Positions</td>
                  <td className={`py-2 ${getBetterStat(driver1.totalPolePositions, driver2.totalPolePositions)}`}>
                    {driver1.totalPolePositions}
                  </td>
                  <td className={`py-2 ${getBetterStat(driver2.totalPolePositions, driver1.totalPolePositions)}`}>
                    {driver2.totalPolePositions}
                  </td>
                </tr>
                {/* Race Wins */}
                <tr className="border-b">
                  <td className="py-2">Race Wins</td>
                  <td className={`py-2 ${getBetterStat(driver1.totalRaceWins, driver2.totalRaceWins)}`}>
                    {driver1.totalRaceWins}
                  </td>
                  <td className={`py-2 ${getBetterStat(driver2.totalRaceWins, driver1.totalRaceWins)}`}>
                    {driver2.totalRaceWins}
                  </td>
                </tr>
                {/* Points Scored */}
                <tr className="border-b">
                  <td className="py-2">Points Scored</td>
                  <td className={`py-2 ${getBetterStat(driver1.totalPointsScored, driver2.totalPointsScored)}`}>
                    {driver1.totalPointsScored}
                  </td>
                  <td className={`py-2 ${getBetterStat(driver2.totalPointsScored, driver1.totalPointsScored)}`}>
                    {driver2.totalPointsScored}
                  </td>
                </tr>
                {/* World Titles */}
                <tr className="border-b">
                  <td className="py-2">World Titles</td>
                  <td className={`py-2 ${getBetterStat(driver1.totalWorldTitles, driver2.totalWorldTitles)}`}>
                    {driver1.totalWorldTitles}
                  </td>
                  <td className={`py-2 ${getBetterStat(driver2.totalWorldTitles, driver1.totalWorldTitles)}`}>
                    {driver2.totalWorldTitles}
                  </td>
                </tr>
                {/* Fastest Laps */}
                <tr className="border-b">
                  <td className="py-2">Fastest Laps</td>
                  <td className={`py-2 ${getBetterStat(driver1.totalFastestLaps, driver2.totalFastestLaps)}`}>
                    {driver1.totalFastestLaps}
                  </td>
                  <td className={`py-2 ${getBetterStat(driver2.totalFastestLaps, driver1.totalFastestLaps)}`}>
                    {driver2.totalFastestLaps}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <Link
          to="/drivers"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Drivers
        </Link>
      </div>
    </div>
  );
};

export default CompareDrivers;
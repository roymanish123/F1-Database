// src/components/QueryDrivers.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const QueryDrivers = () => {
  const [attribute, setAttribute] = useState("age"); // Default attribute
  const [operator, setOperator] = useState("=="); // Default operator
  const [value, setValue] = useState(""); // Value to compare
  const [results, setResults] = useState([]); // Stores query results

  // Function to handle the query
  const handleQuery = async () => {
    try {
      // Convert value to a number if the attribute is numeric
      const numericValue = isNaN(value) ? value : Number(value);

      // Create a Firestore query
      const q = query(collection(db, "drivers"), where(attribute, operator, numericValue));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Extract and store the results
      const data = querySnapshot.docs.map((doc) => doc.data());
      setResults(data);
    } catch (error) {
      alert("Error executing query: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Query Drivers</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* Attribute Selection */}
            <div>
              <label htmlFor="attribute" className="block text-sm font-medium text-gray-700">
                Attribute
              </label>
              <select
                id="attribute"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="age">Age</option>
                <option value="totalPolePositions">Total Pole Positions</option>
                <option value="totalRaceWins">Total Race Wins</option>
                <option value="totalPointsScored">Total Points Scored</option>
                <option value="totalWorldTitles">Total World Titles</option>
                <option value="totalFastestLaps">Total Fastest Laps</option>
              </select>
            </div>

            {/* Operator Selection */}
            <div>
              <label htmlFor="operator" className="block text-sm font-medium text-gray-700">
                Operator
              </label>
              <select
                id="operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="==">Equal</option>
                <option value="<">Less Than</option>
                <option value=">">Greater Than</option>
              </select>
            </div>

            {/* Value Input */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="text"
                id="value"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Query Button */}
            <button
              onClick={handleQuery}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Query
            </button>
          </div>

          {/* Display Results */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Results</h3>
            {results.length > 0 ? (
              <ul className="space-y-4">
                {results.map((driver, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <strong className="text-lg text-gray-800">{driver.name}</strong>
                    <p className="text-sm text-gray-600">
                      Age: {driver.age}, Team: {driver.team}, Pole Positions: {driver.totalPolePositions}, Race Wins: {driver.totalRaceWins}, Points: {driver.totalPointsScored}, World Titles: {driver.totalWorldTitles}, Fastest Laps: {driver.totalFastestLaps}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No drivers match the query.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryDrivers;
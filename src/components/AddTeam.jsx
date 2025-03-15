// src/components/AddTeam.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddTeam = () => {
  const [name, setName] = useState("");
  const [yearFounded, setYearFounded] = useState("");
  const [totalPolePositions, setTotalPolePositions] = useState("");
  const [totalRaceWins, setTotalRaceWins] = useState("");
  const [totalConstructorTitles, setTotalConstructorTitles] = useState("");
  const [finishingPosition, setFinishingPosition] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "teams"), {
        name,
        yearFounded: parseInt(yearFounded),
        totalPolePositions: parseInt(totalPolePositions),
        totalRaceWins: parseInt(totalRaceWins),
        totalConstructorTitles: parseInt(totalConstructorTitles),
        finishingPosition: parseInt(finishingPosition),
      });
      alert("Team added successfully!");
      navigate("/teams");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Team</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Team Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter team name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="yearFounded" className="block text-sm font-medium text-gray-700">
              Year Founded
            </label>
            <input
              type="number"
              id="yearFounded"
              placeholder="Enter year founded"
              value={yearFounded}
              onChange={(e) => setYearFounded(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="totalPolePositions" className="block text-sm font-medium text-gray-700">
              Total Pole Positions
            </label>
            <input
              type="number"
              id="totalPolePositions"
              placeholder="Enter total pole positions"
              value={totalPolePositions}
              onChange={(e) => setTotalPolePositions(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="totalRaceWins" className="block text-sm font-medium text-gray-700">
              Total Race Wins
            </label>
            <input
              type="number"
              id="totalRaceWins"
              placeholder="Enter total race wins"
              value={totalRaceWins}
              onChange={(e) => setTotalRaceWins(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="totalConstructorTitles" className="block text-sm font-medium text-gray-700">
              Total Constructor Titles
            </label>
            <input
              type="number"
              id="totalConstructorTitles"
              placeholder="Enter total constructor titles"
              value={totalConstructorTitles}
              onChange={(e) => setTotalConstructorTitles(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="finishingPosition" className="block text-sm font-medium text-gray-700">
              Finishing Position (Previous Season)
            </label>
            <input
              type="number"
              id="finishingPosition"
              placeholder="Enter finishing position"
              value={finishingPosition}
              onChange={(e) => setFinishingPosition(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
// src/components/EditDriver.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("");
  const [totalPolePositions, setTotalPolePositions] = useState("");
  const [totalRaceWins, setTotalRaceWins] = useState("");
  const [totalPointsScored, setTotalPointsScored] = useState("");
  const [totalWorldTitles, setTotalWorldTitles] = useState("");
  const [totalFastestLaps, setTotalFastestLaps] = useState("");
  const [teams, setTeams] = useState([]); // State to store teams

  // Fetch driver data and teams
  useEffect(() => {
    const fetchDriverAndTeams = async () => {
      // Fetch driver data
      const driverDoc = await getDoc(doc(db, "drivers", id));
      if (driverDoc.exists()) {
        const driverData = driverDoc.data();
        setName(driverData.name);
        setAge(driverData.age);
        setTeam(driverData.team);
        setTotalPolePositions(driverData.totalPolePositions);
        setTotalRaceWins(driverData.totalRaceWins);
        setTotalPointsScored(driverData.totalPointsScored);
        setTotalWorldTitles(driverData.totalWorldTitles);
        setTotalFastestLaps(driverData.totalFastestLaps);
      } else {
        alert("Driver not found!");
        navigate("/drivers");
      }

      // Fetch teams
      const teamsSnapshot = await getDocs(collection(db, "teams"));
      const teamData = teamsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeams(teamData);
    };
    fetchDriverAndTeams();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "drivers", id), {
        name,
        age: parseInt(age),
        team,
        totalPolePositions: parseInt(totalPolePositions),
        totalRaceWins: parseInt(totalRaceWins),
        totalPointsScored: parseInt(totalPointsScored),
        totalWorldTitles: parseInt(totalWorldTitles),
        totalFastestLaps: parseInt(totalFastestLaps),
      });
      alert("Driver updated successfully!");
      navigate("/");
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
            <select
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="totalPointsScored" className="block text-sm font-medium text-gray-700">
              Total Points Scored
            </label>
            <input
              type="number"
              id="totalPointsScored"
              placeholder="Enter total points scored"
              value={totalPointsScored}
              onChange={(e) => setTotalPointsScored(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="totalWorldTitles" className="block text-sm font-medium text-gray-700">
              Total World Titles
            </label>
            <input
              type="number"
              id="totalWorldTitles"
              placeholder="Enter total world titles"
              value={totalWorldTitles}
              onChange={(e) => setTotalWorldTitles(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="totalFastestLaps" className="block text-sm font-medium text-gray-700">
              Total Fastest Laps
            </label>
            <input
              type="number"
              id="totalFastestLaps"
              placeholder="Enter total fastest laps"
              value={totalFastestLaps}
              onChange={(e) => setTotalFastestLaps(e.target.value)}
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
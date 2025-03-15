// src/components/CompareTeams.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const CompareTeams = () => {
  const [teams, setTeams] = useState([]); // List of all teams
  const [team1, setTeam1] = useState(null); // Selected team 1
  const [team2, setTeam2] = useState(null); // Selected team 2
  const [error, setError] = useState(""); // Error message

  // Fetch all teams from Firestore
  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeams(data);
    };
    fetchTeams();
  }, []);

  // Function to handle team selection
  const handleTeamSelect = (e, setTeam) => {
    const selectedTeam = teams.find((team) => team.id === e.target.value);
    setTeam(selectedTeam);

    // Reset error message
    setError("");
  };

  // Function to determine the better stat
  const getBetterStat = (stat1, stat2, isLowerBetter = false) => {
    if (isLowerBetter) {
      return stat1 < stat2 ? "bg-green-200" : "";
    }
    return stat1 > stat2 ? "bg-green-200" : "";
  };

  // Validate if the same team is selected
  useEffect(() => {
    if (team1 && team2 && team1.id === team2.id) {
      setError("You cannot compare the same team. Please select a different team.");
      setTeam2(null); // Reset the second team selection
    }
  }, [team1, team2]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Compare Teams</h2>
        <div className="flex space-x-4 mb-6">
          {/* Dropdown for Team 1 */}
          <div className="flex-1">
            <label htmlFor="team1" className="block text-sm font-medium text-gray-700">
              Select Team 1
            </label>
            <select
              id="team1"
              onChange={(e) => handleTeamSelect(e, setTeam1)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown for Team 2 */}
          <div className="flex-1">
            <label htmlFor="team2" className="block text-sm font-medium text-gray-700">
              Select Team 2
            </label>
            <select
              id="team2"
              onChange={(e) => handleTeamSelect(e, setTeam2)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
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
        {team1 && team2 && !error && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparison</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Stat</th>
                  <th className="py-2">{team1.name}</th>
                  <th className="py-2">{team2.name}</th>
                </tr>
              </thead>
              <tbody>
                {/* Year Founded */}
                <tr className="border-b">
                  <td className="py-2">Year Founded</td>
                  <td className={`py-2 ${getBetterStat(team1.yearFounded, team2.yearFounded, true)}`}>
                    {team1.yearFounded}
                  </td>
                  <td className={`py-2 ${getBetterStat(team2.yearFounded, team1.yearFounded, true)}`}>
                    {team2.yearFounded}
                  </td>
                </tr>
                {/* Total Pole Positions */}
                <tr className="border-b">
                  <td className="py-2">Total Pole Positions</td>
                  <td className={`py-2 ${getBetterStat(team1.totalPolePositions, team2.totalPolePositions)}`}>
                    {team1.totalPolePositions}
                  </td>
                  <td className={`py-2 ${getBetterStat(team2.totalPolePositions, team1.totalPolePositions)}`}>
                    {team2.totalPolePositions}
                  </td>
                </tr>
                {/* Total Race Wins */}
                <tr className="border-b">
                  <td className="py-2">Total Race Wins</td>
                  <td className={`py-2 ${getBetterStat(team1.totalRaceWins, team2.totalRaceWins)}`}>
                    {team1.totalRaceWins}
                  </td>
                  <td className={`py-2 ${getBetterStat(team2.totalRaceWins, team1.totalRaceWins)}`}>
                    {team2.totalRaceWins}
                  </td>
                </tr>
                {/* Total Constructor Titles */}
                <tr className="border-b">
                  <td className="py-2">Total Constructor Titles</td>
                  <td className={`py-2 ${getBetterStat(team1.totalConstructorTitles, team2.totalConstructorTitles)}`}>
                    {team1.totalConstructorTitles}
                  </td>
                  <td className={`py-2 ${getBetterStat(team2.totalConstructorTitles, team1.totalConstructorTitles)}`}>
                    {team2.totalConstructorTitles}
                  </td>
                </tr>
                {/* Previous Season Position */}
                <tr className="border-b">
                  <td className="py-2">Previous Season Position</td>
                  <td className={`py-2 ${getBetterStat(team1.previousSeasonPosition, team2.previousSeasonPosition, true)}`}>
                    {team1.previousSeasonPosition}
                  </td>
                  <td className={`py-2 ${getBetterStat(team2.previousSeasonPosition, team1.previousSeasonPosition, true)}`}>
                    {team2.previousSeasonPosition}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <Link
          to="/teams"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Teams
        </Link>
      </div>
    </div>
  );
};

export default CompareTeams;
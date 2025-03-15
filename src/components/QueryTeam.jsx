// src/components/QueryTeam.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const QueryTeam = () => {
  const [teams, setTeams] = useState([]);
  const [attribute, setAttribute] = useState("yearFounded");
  const [operator, setOperator] = useState("==");
  const [value, setValue] = useState("");

  const handleQuery = async (e) => {
    e.preventDefault();
    try {
      const teamsRef = collection(db, "teams");
      let q;

      if (operator === "==") {
        q = query(teamsRef, where(attribute, "==", Number(value)));
      } else if (operator === "<") {
        q = query(teamsRef, where(attribute, "<", Number(value)));
      } else if (operator === ">") {
        q = query(teamsRef, where(attribute, ">", Number(value)));
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeams(data);
    } catch (error) {
      alert("Error querying teams: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Query Teams</h2>
        <form onSubmit={handleQuery} className="space-y-4">
          <div>
            <label htmlFor="attribute" className="block text-sm font-medium text-gray-700">
              Attribute
            </label>
            <select
              id="attribute"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="yearFounded">Year Founded</option>
              <option value="totalRaceWins">Total Race Wins</option>
              <option value="totalConstructorTitles">Total Constructor Titles</option>
              <option value="previousSeasonPosition">Previous Season Position</option>
            </select>
          </div>
          <div>
            <label htmlFor="operator" className="block text-sm font-medium text-gray-700">
              Operator
            </label>
            <select
              id="operator"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="==">Equal to</option>
              <option value="<">Less than</option>
              <option value=">">Greater than</option>
            </select>
          </div>
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Query Teams
          </button>
        </form>
        <ul className="mt-6 space-y-4">
          {teams.map((team) => (
            <li key={team.id} className="bg-white p-4 rounded-lg shadow-md">
              <strong className="text-lg text-gray-800">{team.name}</strong>
              <p className="text-sm text-gray-600">
                Year Founded: {team.yearFounded}, Race Wins: {team.totalRaceWins}, Constructor Titles: {team.totalConstructorTitles}, Previous Season Position: {team.previousSeasonPosition}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueryTeam;
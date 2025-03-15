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
        <h2 className="text-2xl font-bold mb-6 text-gray-800 animate-fade-in">
          Query Teams
        </h2>
        <form onSubmit={handleQuery} className="bg-white p-6 rounded-lg shadow-md animate-slide-in-up">
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
              >
                <option value="yearFounded">Year Founded</option>
                <option value="totalRaceWins">Total Race Wins</option>
                <option value="totalConstructorTitles">Total Constructor Titles</option>
                <option value="previousSeasonPosition">Previous Season Position</option>
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
              >
                <option value="==">Equal to</option>
                <option value="<">Less than</option>
                <option value=">">Greater than</option>
              </select>
            </div>

            {/* Value Input */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="number"
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
              />
            </div>

            {/* Query Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Query Teams
            </button>
          </div>
        </form>

        {/* Display Results */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 animate-fade-in">
            Results
          </h3>
          {teams.length > 0 ? (
            <ul className="space-y-4">
              {teams.map((team) => (
                <li
                  key={team.id}
                  className="bg-white p-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-102 hover:shadow-lg animate-fade-in-up"
                >
                  <strong className="text-lg text-gray-800">{team.name}</strong>
                  <p className="text-sm text-gray-600">
                    Year Founded: {team.yearFounded}, Race Wins: {team.totalRaceWins}, Constructor Titles: {team.totalConstructorTitles}, Previous Season Position: {team.previousSeasonPosition}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 animate-fade-in">No teams match the query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryTeam;
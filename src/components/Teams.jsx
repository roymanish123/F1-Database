// src/components/Teams.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch teams from Firestore
  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeams(data);
    };
    fetchTeams();
  }, []);

  // Function to handle deleting a team
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "teams", id));
      alert("Team deleted successfully!");
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/edit-team/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Teams</h2>
        <div className="flex space-x-4 mb-6">
          {user && (
            <Link to="/add-team">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105">
                Add New Team
              </button>
            </Link>
          )}
          <Link to="/">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 transform hover:scale-105">
              View Drivers
            </button>
          </Link>
          <Link to="/query-drivers">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 transform hover:scale-105">
              Query Drivers
            </button>
          </Link>
          <Link to="/query-teams">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 transform hover:scale-105">
              Query Teams
            </button>
          </Link>
        </div>
        <ul className="space-y-4">
          {teams.map((team) => (
            <li key={team.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div>
                <strong className="text-lg text-gray-800">{team.name}</strong>
                <p className="text-sm text-gray-600">
                  Year Founded: {team.yearFounded}, Total Race Wins: {team.totalRaceWins}, Total Constructor Titles: {team.totalConstructorTitles}, Previous Season Position: {team.previousSeasonPosition}
                </p>
              </div>
              {user && (
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(team.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 transform hover:scale-110"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 transform hover:scale-110"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Teams;
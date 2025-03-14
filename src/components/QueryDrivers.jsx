// src/components/QueryDrivers.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const QueryDrivers = () => {
  const [attribute, setAttribute] = useState("age");
  const [operator, setOperator] = useState("==");
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const handleQuery = async () => {
    try {
      const q = query(collection(db, "drivers"), where(attribute, operator, value));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setResults(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Query Drivers</h2>
      <select value={attribute} onChange={(e) => setAttribute(e.target.value)}>
        <option value="age">Age</option>
        <option value="total_race_wins">Total Race Wins</option>
      </select>
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="==">Equal</option>
        <option value="<">Less Than</option>
        <option value=">">Greater Than</option>
      </select>
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleQuery}>Query</button>
      <ul>
        {results.map((driver, index) => (
          <li key={index}>{driver.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueryDrivers;
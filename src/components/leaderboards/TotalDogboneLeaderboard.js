// src/components/leaderboards/TotalDogboneLeaderboard.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import "./TotalDogboneLeaderboard.css";

const TotalDogboneLeaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "users"),
          orderBy("totalDogbone", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const leaderboardData = querySnapshot.docs.map(doc => doc.data());
        setUsers(leaderboardData);
      } catch (error) {
        console.error("Error fetching total DOGBONE leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="total-leaderboard">
      <h2>Total DOGBONE Leaderboard</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <span className="rank">#{index + 1}</span>
            <span className="name">{user.username || "Anonymous"}</span>
            <span className="score">{user.totalDogbone || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalDogboneLeaderboard;

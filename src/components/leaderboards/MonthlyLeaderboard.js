// src/components/leaderboards/MonthlyLeaderboard.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import "./MonthlyLeaderboard.css";

const MonthlyLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchMonthlyScores = async () => {
      try {
        const thirtyDaysAgo = Timestamp.fromDate(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );

        const q = query(
          collection(db, "gameScores"),
          where("timestamp", ">=", thirtyDaysAgo),
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        const userTotals = {};

        snapshot.docs.forEach((doc) => {
          const { userId, username, dogboneEarned } = doc.data();
          if (!userId) return;

          if (!userTotals[userId]) {
            userTotals[userId] = {
              username: username || "Anonymous",
              total: 0,
            };
          }

          userTotals[userId].total += dogboneEarned || 0;
        });

        const sortedLeaders = Object.values(userTotals)
          .sort((a, b) => b.total - a.total)
          .slice(0, 10);

        setLeaders(sortedLeaders);
      } catch (error) {
        console.error("Error fetching monthly leaderboard:", error);
      }
    };

    fetchMonthlyScores();
  }, []);

  return (
    <div className="monthly-leaderboard">
      <h2>Monthly DOGBONE Leaderboard</h2>
      <ul>
        {leaders.map((user, index) => (
          <li key={index}>
            <span className="rank">#{index + 1}</span>
            <span className="name">{user.username}</span>
            <span className="score">{user.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyLeaderboard;

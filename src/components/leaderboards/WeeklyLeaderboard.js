// src/components/leaderboards/WeeklyLeaderboard.js
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
import "./WeeklyLeaderboard.css";

const WeeklyLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchWeeklyScores = async () => {
      try {
        const oneWeekAgo = Timestamp.fromDate(
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );

        const q = query(
          collection(db, "gameScores"),
          where("timestamp", ">=", oneWeekAgo),
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
        console.error("Error fetching weekly leaderboard:", error);
      }
    };

    fetchWeeklyScores();
  }, []);

  return (
    <div className="weekly-leaderboard">
      <h2>Weekly DOGBONE Leaderboard</h2>
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

export default WeeklyLeaderboard;

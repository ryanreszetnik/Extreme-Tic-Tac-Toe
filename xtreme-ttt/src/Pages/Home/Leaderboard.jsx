import React from "react";
import { useSelector } from "react-redux";

const stats = [
  {
    username: "ryguy",
    rank: 3,
    wins: 15,
    losses: 12,
  },
  {
    username: "sehr",
    rank: 2,
    wins: 2,
    losses: 5,
  },
  {
    username: "matt",
    rank: 1,
    wins: 39,
    losses: 5,
  },
];
export default function Leaderboard() {
  const players = useSelector((state) => state.leaderboard);
  const playerStats = (player) => {
    return (
      <tr key={player.username}>
        <th>{player.place}</th>
        <th>{player.username}</th>
        <th>{player.wins}</th>
        <th>{player.losses}</th>
      </tr>
    );
  };
  return (
    <div>
      Leaderboard
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {players.sort((a, b) => a.rank - b.rank).map((s) => playerStats(s))}
        </tbody>
      </table>
    </div>
  );
}

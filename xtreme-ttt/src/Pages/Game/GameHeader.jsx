import React from "react";
import { useSelector } from "react-redux";

export default function GameHeader({ players, turn, winner }) {
  const sub = useSelector((state) => state.user.userData.attributes.sub);
  const getMessage = () => {
    if (players.length === 1) {
      //game hasn't started --> waiting for player
      return "Waiting for opponent...";
    } else if (turn === null) {
      const otherPlayer = players.find((p) => p.sub != sub);
      return `You vs ${otherPlayer.username}`;
    } else if (players.some((p) => p.sub === sub)) {
      // game started --> you vs ___, x vs o, currently x turn
      const yourPiece = players.find((p) => p.sub === sub).piece;
      const otherPlayer = players.find((p) => p.sub != sub);
      if (winner) {
        if (sub === winner) {
          return "You Win!!!";
        }
        return "You Lose :(";
      }
      return `You (${yourPiece}) vs ${otherPlayer.username} (${otherPlayer.piece}) | ${turn}'s Move`;
    } else {
      //spectator
      if (winner) {
        const winnerPlayer = players.find((p) => p.sub === winner);
        return `${winnerPlayer.username} Wins!`;
      }
      return `${players[0].username} (${players[0].piece}) vs ${players[1].username} (${players[1].piece}) | ${turn}'s Move`;
    }
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#DDD",
        textAlign: "center",
        padding: 10,
        fontSize: 25,
      }}
    >
      {getMessage()}
    </div>
  );
}

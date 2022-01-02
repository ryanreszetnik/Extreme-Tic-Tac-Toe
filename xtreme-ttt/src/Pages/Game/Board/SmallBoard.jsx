import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Square from "./Square";
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function SmallBoard({ position, squareSize }) {
  const [winners, setWinners] = useState(new Array(9).fill(false));
  const board = useSelector((state) => state.currentGame.board);
  const getWinners = () => {
    const places = board.slice(position * 9, position * 9 + 9);
    const isWin = new Array(9).fill(false);
    wins.forEach((w) => {
      let val = "";
      let isSingleWin = true;
      w.forEach((p) => {
        if ((val === "" || val === places[p]) && places[p] != "_") {
          val = places[p];
        } else {
          isSingleWin = false;
        }
      });
      if (isSingleWin) {
        w.forEach((p) => {
          isWin[p] = true;
        });
      }
    });
    setWinners(isWin);
  };
  useEffect(() => {
    getWinners();
  }, [board]);
  return (
    <div
      style={{
        width: squareSize * 3 - 26,
        height: squareSize * 3 - 26,
        borderStyle: "solid",
        borderWidth: 3,
        padding: 10,
        display: "flex",
        flexWrap: "wrap",
        margin: 0,
        borderLeftColor: position % 3 == 0 ? "white" : "black",
        borderRightColor: position % 3 == 2 ? "white" : "black",
        borderTopColor: Math.floor(position / 3) == 0 ? "white" : "black",
        borderBottomColor: Math.floor(position / 3) == 2 ? "white" : "black",
      }}
    >
      {[...new Array(9)].map((a, i) => (
        <Square
          position={i + position * 9}
          size={squareSize}
          isWin={winners[i]}
        />
      ))}
    </div>
  );
}

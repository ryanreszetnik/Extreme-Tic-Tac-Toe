import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SmallBoard from "./SmallBoard";
import Square from "./Square";

export default function Board() {
  const sub = useSelector((state) => state.user.userData.attributes.sub);
  const yourPlayer = useSelector((state) =>
    state.currentGame.players.find((p) => p.sub === sub)
  );
  const currentTurn = useSelector((state) => state.currentGame.currentTurn);
  const isYourTurn = yourPlayer != null && yourPlayer.piece === currentTurn;
  const isFinished = useSelector((state) => state.currentGame.isFinished);
  function getSquareSize() {
    return Math.min(
      Math.min(50, window.innerWidth / 9),
      window.innerHeight / 9
    );
  }
  const [squareSize, setSquareSize] = useState(getSquareSize());
  useEffect(() => {
    function handleResize() {
      setSquareSize(getSquareSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        width: squareSize * 9,
        height: squareSize * 9,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexWrap: "wrap",
        borderStyle: "solid",
        borderWidth: "5px",
        borderColor: isYourTurn && !isFinished ? "green" : "white",
      }}
    >
      {[...new Array(9)].map((a, i) => (
        <SmallBoard position={i} squareSize={squareSize} />
      ))}
      {/* {[...new Array(81)].map((a, i) => (
        <Square size={squareSize} position={i} />
      ))} */}
    </div>
  );
}

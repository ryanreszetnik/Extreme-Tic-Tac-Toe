import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_GAME } from "../../../Constants/reducerEvents";
import { sendMove } from "../../../Socket/socketMethods";
import { isGameFinished } from "../../../Utils/BoardUtils";

const styles = {
  X: "#F33",
  O: "#3F3",
  _: "#FFF",
  PLAYABLE: "#3FF",
};

export default function Square({ size, position, isWin }) {
  const boardPos = position - Math.floor(position / 9) * 9;
  const value = useSelector((state) => state.currentGame.board[position]);
  const game = useSelector((state) => state.currentGame);
  const sub = useSelector((state) => state.user.userData.attributes.sub);
  const dispatch = useDispatch();

  const boardIsFull = (squarePos) => {
    const boardStart = (squarePos % 9) * 9;
    for (let i = boardStart; i < boardStart + 9; i++) {
      if (game.board[i] === "_") {
        return false;
      }
    }
    return true;
  };

  const onClick = () => {
    const youPlayer = game.players.find((p) => p.sub === sub);
    if (game.players.length < 2) {
      console.log("Game hasn't started");
      return;
    }
    if (!youPlayer) {
      console.log("you are not in the game");
      return;
    }
    if (game.currentTurn != youPlayer.piece) {
      console.log("not your turn");
      return;
    }
    if (game.isFinished) {
      console.log("Game already finished");
      return;
    }
    if (
      !(
        game.lastMove === null ||
        game.lastMove.position % 9 === Math.floor(position / 9) ||
        boardIsFull(game.lastMove.position)
      )
    ) {
      console.log("Can't play in that board");
      return;
    }
    //play
    console.log("play", youPlayer.piece, position, game);
    const newBoard = game.board;
    newBoard[position] = youPlayer.piece;
    const isFinished = isGameFinished(newBoard);
    const newGame = {
      ...game,
      currentTurn: game.players.find((p) => p.sub != sub).piece,
      board: newBoard,
      lastMove: { time: new Date().toISOString(), position: position },
      isFinished: isFinished,
    };
    dispatch({ type: UPDATE_GAME, payload: newGame });
    sendMove(game.id, position, isFinished);
  };
  const getBackgroundColor = () => {
    if (isWin) {
      return value === "X" ? styles.X : styles.O;
    }
    if (
      game.lastMove === null ||
      (value === "_" &&
        (game.lastMove.position % 9 === Math.floor(position / 9) ||
          boardIsFull(game.lastMove.position)))
    ) {
      return styles.PLAYABLE;
    }
    return styles._;
  };
  return (
    <div
      style={{
        width: size - 12.66666,
        height: size - 12.66666,
        borderStyle: "solid",
        borderWidth: "2px",
        borderLeftColor: boardPos % 3 == 0 ? "white" : "black",
        borderRightColor: boardPos % 3 == 2 ? "white" : "black",
        borderTopColor: Math.floor(boardPos / 3) == 0 ? "white" : "black",
        borderBottomColor: Math.floor(boardPos / 3) == 2 ? "white" : "black",
        textAlign: "center",
        fontSize: size / 2,
        backgroundColor: getBackgroundColor(),
        cursor: value === "_" ? "pointer" : "",
      }}
      onClick={() => onClick()}
    >
      {/* {JSON.stringify(isWin)} */}
      {value != "_" && value}
    </div>
  );
}

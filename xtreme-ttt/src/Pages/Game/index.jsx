import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SET_CURRENT_GAME_ID } from "../../Constants/reducerEvents";
import { joinGame } from "../../Socket/socketMethods";
import Board from "./Board";
import GameHeader from "./GameHeader";

export default function Game() {
  const { id } = useParams();
  const game = useSelector((state) => state.currentGame);
  const winner = useSelector((state) => state.currentGame.winner);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_CURRENT_GAME_ID, payload: id });
    joinGame(id);
  }, []);
  return (
    <div>
      {game.players ? (
        <div>
          <GameHeader
            players={game.players}
            turn={game.currentTurn}
            winner={winner}
          />
          <div
            style={{
              wdith: "100%",
              paddingTop: 50,
            }}
          >
            <Board />
          </div>
        </div>
      ) : (
        <div>Loading Game...</div>
      )}
    </div>
  );
}

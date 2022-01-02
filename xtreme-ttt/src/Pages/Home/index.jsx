import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinGame } from "../../Socket/socketMethods";
import GamePreview from "./GamePreview";
import Leaderboard from "./Leaderboard";
import { v4 as uuidv4 } from "uuid";
import { RESET_CURRENT_GAME } from "../../Constants/reducerEvents";

export default function Home() {
  const allGames = useSelector((state) => state.games);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userData.username);
  const sub = useSelector((state) => state.user.userData.attributes.sub);
  const getGame = (game) => {
    return <GamePreview game={game} key={game.id} />;
  };
  const createNewGame = () => {
    const gameId = allGames.find(
      (g) => !g.isFinished && g.players.length === 1 && g.players[0].sub === sub
    )?.id;
    if (gameId !== undefined) {
      navigate(`/game/${gameId}`);
    } else {
      navigate(`/game/${uuidv4()}`);
    }
  };
  useEffect(() => {
    dispatch({ type: RESET_CURRENT_GAME });
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <Button variant="contained" onClick={() => createNewGame()}>
          Create New Game
        </Button>
        <div>My Active Games</div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {allGames
            .filter(
              (g) => !g.isFinished && g.players.some((p) => p.sub === sub)
            )
            .map((g) => getGame(g))}
        </div>
        <div>Open Games</div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {allGames
            .filter(
              (g) =>
                !g.isFinished &&
                g.players.length === 1 &&
                g.players[0].sub !== sub
            )
            .map((g) => getGame(g))}
        </div>
        <div>Spectate Other Games</div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {allGames
            .filter(
              (g) =>
                !g.isFinished &&
                g.players.length > 1 &&
                !g.players.some((p) => p.sub === sub)
            )
            .map((g) => getGame(g))}
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}

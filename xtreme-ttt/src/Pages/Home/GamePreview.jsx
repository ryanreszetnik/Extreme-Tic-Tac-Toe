import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function GamePreview({ game }) {
  const navigate = useNavigate();
  const goToGame = () => {
    navigate(`/game/${game.id}`);
  };
  const getPlayerText = () => {
    if (game.players.length > 1) {
      return `${game.players[0].username} vs ${game.players[1].username}`;
    }
    return `${game.players[0].username}`;
  };
  return (
    <Card
      sx={{ minWidth: 225, maxWidth: 250, cursor: "pointer" }}
      onClick={() => goToGame()}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ textAlign: "center" }}
        >
          {getPlayerText()}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
          style={{ textAlign: "center" }}
        >
          {moment(game.timeCreated).calendar()}
        </Typography>
      </CardContent>
    </Card>
  );
}

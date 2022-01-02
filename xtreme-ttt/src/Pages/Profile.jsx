import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadPastGames } from "../Socket/socketMethods";
import moment from "moment";

export default function Profile() {
  const pastGames = useSelector((state) => state.pastGames);
  const sub = useSelector((state) => state.user.userData.attributes.sub);
  useEffect(() => {
    loadPastGames();
  }, []);
  const getTimeFinished = (game) => {
    return game.lastMove ? game.lastMove.time : game.timeCreated;
  };
  const pastGamePreview = (game) => {
    //players.sub, players.username, winner:sub, timeCreated, lastMove:something
    const otherPlayer = game.players.find((p) => p.sub !== sub);
    const timeFinished = getTimeFinished(game);
    return (
      <tr key={game.id}>
        <th>{otherPlayer?.username}</th>
        <th>{moment(game.timeCreated).calendar()}</th>
        <th>{moment(timeFinished).calendar()}</th>
        <th>{sub === game.winner ? "Win" : "Loss"}</th>
      </tr>
    );
  };
  return (
    <div>
      <div>Profile</div>
      <table>
        <thead>
          <tr>
            <th>Other Player</th>
            <th>Time Started</th>
            <th>Time Ended</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {pastGames
            .sort((a, b) => {
              return getTimeFinished(a) > getTimeFinished(b) ? -1 : 1;
            })
            .map((g) => pastGamePreview(g))}
        </tbody>
      </table>
    </div>
  );
}

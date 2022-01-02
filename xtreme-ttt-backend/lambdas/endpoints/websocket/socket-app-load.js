const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const Responses = require("../../common/API_Responses");
const Formatting = require("../../common/Formatting");
const Dynamo = require("../../common/dynamo");
const Socket = require("../../common/socket");
const Database = require("../../common/CommonDatabaseCalls");
const SocketConstants = require("../../common/SocketConstants");
const Tables = require("../../common/TableConstants");
exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const callingSub = await Database.getSubFromConnection(connectionId);
  const users = await Dynamo.scan(Tables.USERS);
  const leaderboard = users
    .sort((a, b) => {
      if (a.losses === 0 && b.losses === 0) {
        return b.wins - a.wins;
      }
      if (a.losses === 0) {
        return -1;
      }
      if (b.losses === 0) {
        return 1;
      }
      return b.wins / b.losses - a.wins / a.losses;
    })
    .map((a, i) => {
      return {
        ...a,
        place: i + 1,
      };
    });
  const games = (
    await Dynamo.scan(Tables.GAMES, "isFinished = :finished", {
      ":finished": false,
    })
  ).map((a) => {
    return {
      id: a.id,
      timeCreated: a.timeCreated,
      isFinished: a.isFinished,
      players: a.players,
    };
  });
  const resp = {
    leaderboard: leaderboard,
    games: games,
  };
  return Responses._200_socket(SocketConstants.APP_LOAD, resp);
};

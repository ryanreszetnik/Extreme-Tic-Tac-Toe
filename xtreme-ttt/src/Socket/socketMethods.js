import {
  SOCKET_SEND_JOIN_GAME,
  SOCKET_SEND_LOAD_PAST_GAMES,
  SOCKET_SEND_MOVE,
} from "../Constants/outgoingSocket";
import store from "../Redux/store";

let socket = null;
function updateSocket() {
  const state = store.getState();
  try {
    socket = state.socket;
  } catch (e) {
    console.log("socket or sub does not exist");
  }
}
store.subscribe(updateSocket);
const socketSend = (action, data) => {
  console.log("sending", action, data);
  try {
    socket.send(
      JSON.stringify({
        action,
        data,
      })
    );
  } catch (e) {
    console.log(e);
  }
};
export const sendMove = (id, position, isFinished) => {
  socketSend(SOCKET_SEND_MOVE, { id, position, isFinished });
};
export const joinGame = (id) => {
  socketSend(SOCKET_SEND_JOIN_GAME, { id });
};

export const loadPastGames = () => {
  socketSend(SOCKET_SEND_LOAD_PAST_GAMES, {});
};

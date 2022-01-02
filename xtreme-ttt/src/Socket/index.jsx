import React, { Fragment, useEffect, useState } from "react";
import { socketURL } from "../Constants/awsConstants";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  SET_GAMES,
  SET_PAST_GAMES,
  SET_SOCKET,
  UPDATE_GAME,
  UPDATE_LEADERBOARD,
} from "../Constants/reducerEvents";
import {
  APP_LOAD,
  SOCKET_LOAD_PAST_GAMES,
  SOCKET_UPDATE_GAME,
  SOCKET_UPDATE_LEADERBOARD,
} from "../Constants/incomingSocket";
import { SOCKET_SEND_APP_LOAD } from "../Constants/outgoingSocket";
import { joinGame } from "./socketMethods";

export default function SocketClient() {
  const globalSocket = useSelector((state) => state.socket);
  const token = useSelector((state) => state.user.accessToken.jwtToken);
  const currGameId = useSelector((state) => state.currentGame.id);
  const dispatch = useDispatch();
  let socket = null;
  var timerId = 0;
  function keepAlive() {
    var timeout = 60000; //570000
    if (globalSocket && globalSocket.readyState === globalSocket.OPEN) {
      console.log("sending ping");
      globalSocket.send("");
    } else if (globalSocket.readyState === globalSocket.CLOSED) {
      cancelKeepAlive();
      console.log("could not send ping... restarting");
      restartConnection();
    }
    timerId = setTimeout(keepAlive, timeout);
  }
  function cancelKeepAlive() {
    if (timerId) {
      clearTimeout(timerId);
    }
  }
  const restartConnection = () => {
    socket = new WebSocket(`${socketURL}?token=${token}`);
    // socket = new WebSocket(`${socketURL}`);
    dispatch({ type: SET_SOCKET, payload: socket });
  };

  useEffect(() => {
    restartConnection();
  }, []);
  useEffect(() => {
    if (globalSocket) {
      globalSocket.onopen = function (event) {
        console.log("Socket Connected");
        console.log(event);
        cancelKeepAlive();
        keepAlive();
        globalSocket.send(
          JSON.stringify({
            action: SOCKET_SEND_APP_LOAD,
            data: "",
          })
        );
        if (currGameId !== "") {
          joinGame(currGameId);
        }
      };
      globalSocket.onclose = function (event) {
        console.log("Socket Disconnected");
        cancelKeepAlive();
      };

      globalSocket.onerror = function (event) {
        console.log("SOCKET ERROR", event);
      };
      globalSocket.onmessage = function (event) {
        let data;
        let body;
        try {
          data = JSON.parse(event.data);
          body = data.body;
          console.log("Event Recieved:", data);
        } catch (e) {
          console.log("No event data: ", event);
          return;
        }
        if (!data.action) {
          console.log("No event action: ", event, data);
          return;
        }
        console.log("Recieved", event, data);
        //add more cases as needed
        switch (data.action) {
          case SOCKET_UPDATE_GAME:
            dispatch({ type: UPDATE_GAME, payload: body });
            break;
          case SOCKET_UPDATE_LEADERBOARD:
            dispatch({ type: UPDATE_LEADERBOARD, payload: body });
            break;
          case APP_LOAD:
            console.log(body.games, body.leaderboard);
            dispatch({ type: SET_GAMES, payload: body.games });
            dispatch({ type: UPDATE_LEADERBOARD, payload: body.leaderboard });
            break;
          case SOCKET_LOAD_PAST_GAMES:
            dispatch({ type: SET_PAST_GAMES, payload: body });
            break;
          default:
            console.log("No Event Action Match", event);
        }
      };

      return () => {
        cancelKeepAlive();
        globalSocket.close();
      };
    }
  }, [globalSocket]);

  return <Fragment />;
}

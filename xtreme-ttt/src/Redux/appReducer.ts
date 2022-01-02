import { combineReducers } from "redux"
import Leaderboard from "../Pages/Home/Leaderboard"
import currentGameReducer from "./Reducers/currentGameReducer"
import gamesReducer from "./Reducers/gamesReducer"
import leaderboardReducer from "./Reducers/leaderboardReducer"
import pastGamesReducer from "./Reducers/pastGamesReducer"
import socketReducer from "./Reducers/socketReducer"
import userReducer from "./Reducers/userReducer"

const rootReducer = combineReducers({
  user:userReducer,
  socket:socketReducer,
  games:gamesReducer,
  currentGame:currentGameReducer,
  leaderboard:leaderboardReducer,
  pastGames:pastGamesReducer
})
export default rootReducer

import { UPDATE_LEADERBOARD } from "../../Constants/reducerEvents"

const INITIAL_STATE:any[] = []
export default function leaderboardReducer(state = INITIAL_STATE, action:{type:string,payload:[]}) {
  switch (action.type) {
    case UPDATE_LEADERBOARD:
      return action.payload
    default:
      return state
  }
}

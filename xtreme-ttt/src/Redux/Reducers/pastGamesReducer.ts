import { SET_PAST_GAMES } from "../../Constants/reducerEvents"

const INITIAL_STATE:any[] = [
];
export default function pastGamesReducer(state = INITIAL_STATE, action:{type:string,payload:any}) {
  switch (action.type) {
    case SET_PAST_GAMES:
      return action.payload
    default:
      return state
  }
}

import moment from "moment"
import { RESET_CURRENT_GAME, SET_CURRENT_GAME_ID, UPDATE_GAME } from "../../Constants/reducerEvents"

const INITIAL_STATE = {id:""}
export default function currentGameReducer(state = INITIAL_STATE, action:{type:string,payload:any}) {
  switch (action.type) {
    case UPDATE_GAME:
        if(action.payload.id===state.id){
            return action.payload;
        }
        return state
    case SET_CURRENT_GAME_ID:
        return {...state,id:action.payload}
    case RESET_CURRENT_GAME:
      return INITIAL_STATE
    default:
      return state
  }
}

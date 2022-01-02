import { SET_SOCKET } from "../../Constants/reducerEvents"

const INITIAL_STATE = null
export default function socketReducer(state = INITIAL_STATE, action:{type:string,payload:string}) {
  switch (action.type) {
    case SET_SOCKET:
      return action.payload
    default:
      return state
  }
}

import { SET_GAMES,ADD_GAME,REMOVE_GAME,UPDATE_GAME } from "../../Constants/reducerEvents"


import moment from "moment";

const INITIAL_STATE:any[] = [
];
export default function gamesReducer(state = INITIAL_STATE, action:{type:string,payload:any}) {
  switch (action.type) {
    case SET_GAMES:
      return action.payload
    case ADD_GAME:
        return [...state,action.payload]
    case REMOVE_GAME:
        return state.filter(g=>g.id!==action.payload)
    case UPDATE_GAME:
      if(state.some(g=>g.id===action.payload.id)){
        return state.map(g=>{
          console.log(g.id)
            if(g.id===action.payload.id){
              console.log(action.payload)
                return {
                    id:action.payload.id,
                    lastMove:action.payload.lastMove,
                    isFinished:action.payload.isFinished,
                    players:action.payload.players,
                }
            }
            return g
        })
      }else{
        return [...state,{
                    id:action.payload.id,
                    lastMove:action.payload.lastMove,
                    isFinished:action.payload.isFinished,
                    players:action.payload.players,
                }]
      }
    default:
      return state
  }
}

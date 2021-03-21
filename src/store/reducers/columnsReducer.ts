import { actionTypes } from "../actionTypes";

const columnInitialState = {};


//TODO: fix type and switch cases
export function columnsReducer(state = columnInitialState, action: Action<null>){
    switch(action.type){
        case actionTypes.ADD_COLUMN:
            return state;
        case actionTypes.REMOVE_COLUMN:
            return state;
        case actionTypes.ADD_CARD:
            return state;
        case actionTypes.REMOVE_CARD:
            return state;
        case actionTypes.EDIT_CARD:
            return state;
        default:
            return state;
    }
}
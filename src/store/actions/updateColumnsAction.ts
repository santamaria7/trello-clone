import { actionTypes } from "../actionTypes";

export function addColumnsAction(payload: AddColumn){
    return {
        type: actionTypes.ADD_COLUMN,
        payload
    }
}
import { actionTypes } from "../actionTypes";

export function updateColumnsAction(payload: Column){
    return {
        type: actionTypes.COLUMNS_UPDATED,
        payload
    }
}
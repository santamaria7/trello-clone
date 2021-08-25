import { actionTypes } from "../actionTypes";

export function columnsReceivedAction(payload: Column[]){
    return {
        type: actionTypes.COLUMNS_RECEIVED,
        payload
    }
}
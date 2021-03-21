import { actionTypes } from "../actionTypes";

export function columnsReceivedAction(payload: TasksType){
    return {
        type: actionTypes.COLUMNS_RECEIVED,
        payload
    }
}
import { actionTypes } from "../actionTypes";

export function columnsReceivedAction(payload: ColumnsType){
    return {
        type: actionTypes.COLUMNS_RECEIVED,
        payload
    }
}
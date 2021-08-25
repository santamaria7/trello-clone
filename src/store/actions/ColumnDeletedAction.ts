import { actionTypes } from "../actionTypes";

export function ColumnDeletedAction(payload: number){
    return {
        type: actionTypes.COLUMN_DELETED,
        payload
    }
}
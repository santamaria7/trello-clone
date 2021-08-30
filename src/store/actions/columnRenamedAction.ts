import { actionTypes } from "../actionTypes";

export function columnRenamedAction(payload: RenameColumn){
    return {
        type: actionTypes.COLUMN_RENAMED,
        payload
    }
}
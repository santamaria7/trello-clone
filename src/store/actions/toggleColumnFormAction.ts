import { actionTypes } from "../actionTypes";

export function toggleColumnFormAction(payload: boolean){
    return {
        type: actionTypes.TOGGLE_COLUMN_FORM,
        payload,
    }
}
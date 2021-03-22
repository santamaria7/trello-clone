import { actionTypes } from "../actionTypes";

export function deleteTaskAction(payload: DeleteTask){
    return{
        type: actionTypes.DELETE_TASK,
        payload
    }
}
import { actionTypes } from "../actionTypes";

export function deleteTaskAction(payload: string){
    return{
        type: actionTypes.DELETE_TASK,
        payload
    }
}
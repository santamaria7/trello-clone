import { actionTypes } from "../actionTypes";

export function addTaskAction(payload: Task){
    return {
        type: actionTypes.ADD_TASK,
        payload
    }
}
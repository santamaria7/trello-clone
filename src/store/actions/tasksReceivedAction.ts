import { actionTypes } from "../actionTypes";

export function tasksReceivedAction(payload: Task[]){
    return {
        type: actionTypes.TASKS_RECEIVED,
        payload
    }
}
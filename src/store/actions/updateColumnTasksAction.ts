import { actionTypes } from "../actionTypes";



export function updateColumnTasksAction(payload: Task){
    return {
        type: actionTypes.TASK_UPDATED,
        payload
    }
}
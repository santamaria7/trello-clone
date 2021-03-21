import { actionTypes } from "../actionTypes";



export function updateColumnTasksAction(payload: UpdateTask){
    return {
        type: actionTypes.TASK_UPDATED,
        payload
    }
}
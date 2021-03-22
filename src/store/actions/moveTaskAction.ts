import { actionTypes } from "../actionTypes";

export function moveTaskAction(payload: MoveTask){
    return {
        type: actionTypes.MOVE_TASK,
        payload
    }
}
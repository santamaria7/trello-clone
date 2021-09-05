import { actionTypes } from "../actionTypes";

const initialTasks: Task[] = [];

export function tasksReducer(
  state = initialTasks,
  action: Action<Task | Task[] | DeleteTask | AddColumn>
) {
  switch (action.type) {
    case actionTypes.TASKS_RECEIVED:
      return action.payload as Task[];

    case actionTypes.TASK_UPDATED:
      const task = action.payload as Task;
      const index = state.findIndex((item) => item.taskId === task.taskId);
      const copy = state.slice();
      copy.splice(index, 1, task);
      return copy;

    /*case actionTypes.DELETE_TASK:
      const { colName: name, id } = action.payload as DeleteTask;
      const i = state[name].findIndex((item) => item.taskId === id);
      const copy2 = state[name].slice();
      copy2.splice(i, 1);
      return {
        ...state,
        [name]: copy2,
      };*/

    case actionTypes.ADD_TASK:
      return [...state, action.payload as Task];

    case actionTypes.ADD_COLUMN:
    default:
      return state;
  }
}

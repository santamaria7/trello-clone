import { actionTypes } from "../actionTypes";

const initialTasks: TasksType = {};

export function tasksReducer(
  state = initialTasks,
  action: Action<TasksType | Task | Task[] | UpdateTask | DeleteTask | MoveTask | AddColumn>
) {
  switch (action.type) {
    case actionTypes.COLUMNS_RECEIVED:
      return {
        ...state,
        ...action.payload as TasksType
      };
    case actionTypes.ADD_COLUMN:
      return {
        ...state,
        [(action.payload as AddColumn).name]:[]
      };
    case actionTypes.TASK_UPDATED:
      const { colName, task } = action.payload as UpdateTask;
      const index = state[colName].findIndex((item) => item.id === task.id);
      const copy = state[colName].slice();
      copy.splice(index, 1, task);
      return {
        ...state,
        [colName]: copy,
      };
    case actionTypes.DELETE_TASK:
      const { colName: name, id } = action.payload as DeleteTask;
      const i = state[name].findIndex((item) => item.id === id);
      const copy2 = state[name].slice();
      copy2.splice(i, 1);
      return {
        ...state,
        [name]: copy2,
      };
    case actionTypes.ADD_TASK:
      return {
        ...state,
        [(action.payload as UpdateTask).colName]: [
          ...state[(action.payload as UpdateTask).colName],
          (action.payload as UpdateTask).task,
        ],
      };
    case actionTypes.MOVE_TASK:
      const { parent, target, task: item } = action.payload as MoveTask;
      const parentTasks = state[parent];
      const j = parentTasks.findIndex((x) => x.id === item.id);
      parentTasks.splice(j, 1);
      return {
        ...state,
        [parent]: parentTasks,
        [target]: [...state[target], item],
      };

    default:
      return state;
  }
}

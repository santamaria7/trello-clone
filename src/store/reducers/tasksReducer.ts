import { actionTypes } from "../actionTypes";

const initialTasks: TasksType = {};

export function tasksReducer(
  state = initialTasks,
  action: Action<
    TasksType | Task | Task[] | UpdateTask | DeleteTask | MoveTask | AddColumn
  >
) {
  switch (action.type) {
    case actionTypes.TASKS_RECEIVED:
      const tasks = (action.payload as Task[]).reduce((res, a) => {
        const { columnId } = a;

        res[columnId] = (action.payload as Task[]).filter(
          (item) => item.columnId === columnId
        );
        return res;
      }, {} as TasksType);
      return {
        ...state,
        ...tasks,
      };
    case actionTypes.ADD_COLUMN:
      return {
        ...state,
        [(action.payload as AddColumn).name]: [],
      };
    /*case actionTypes.TASK_UPDATED:
      const { colName, task } = action.payload as UpdateTask;
      const index = state[colName].findIndex((item) => item.taskId === task.taskId);
      const copy = state[colName].slice();
      copy.splice(index, 1, task);
      return {
        ...state,
        [colName]: copy,
      };*/
    case actionTypes.DELETE_TASK:
      const { colName: name, id } = action.payload as DeleteTask;
      const i = state[name].findIndex((item) => item.taskId === id);
      const copy2 = state[name].slice();
      copy2.splice(i, 1);
      return {
        ...state,
        [name]: copy2,
      };
    case actionTypes.ADD_TASK:
      return {
        ...state,
        [(action.payload as Task).columnId]: [
          ...state[(action.payload as Task).columnId],
          action.payload as Task,
        ],
      };
    case actionTypes.MOVE_TASK:
      const { parent, target, task: item } = action.payload as MoveTask;
      const parentTasks = state[parent];
      const j = parentTasks.findIndex((x) => x.columnId === item.columnId);
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

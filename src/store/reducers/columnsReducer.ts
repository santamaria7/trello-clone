import { actionTypes } from "../actionTypes";

const columnInitialState: Column[] = [];

//TODO: implement column removal
export function columnsReducer(
  state = columnInitialState,
  action: Action<Column[] | AddColumn | RenameColumn | number>
) {
  switch (action.type) {
    case actionTypes.COLUMNS_RECEIVED:
      return action.payload;
    case actionTypes.ADD_COLUMN:
      return [...state, action.payload];
    case actionTypes.COLUMN_DELETED:
      return state.filter((item) => item.columnId !== action.payload);
    case actionTypes.COLUMN_RENAMED:
      const newState = [...state];
      const oldColumn = state.find(
        (item) => item.name === (action.payload as RenameColumn)!.old
      );
      const newColumn = {
        ...oldColumn,
        name: (action.payload as RenameColumn)!.new,
      };
      const i = newState.findIndex(
        (item) => item.name === (action.payload as RenameColumn)!.old
      );
      newState.splice(i, 1, newColumn as Column);
      return newState;

    default:
      return state;
  }
}

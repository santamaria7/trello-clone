import { actionTypes } from "../actionTypes";

const columnInitialState: Column[] = [];

//TODO: implement column removal
export function columnsReducer(
  state = columnInitialState,
  action: Action<Column[] | AddColumn | number>
) {
  switch (action.type) {
    case actionTypes.COLUMNS_RECEIVED:
      return action.payload;
    case actionTypes.ADD_COLUMN:
      return [...state,(action.payload as AddColumn).name];
    case actionTypes.COLUMN_DELETED:
      return state.filter(item => item.columnId !== action.payload);

    default:
      return state;
  }
}

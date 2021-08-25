import { actionTypes } from "../actionTypes";

const columnInitialState: Column[] = [];

//TODO: implement column removal
export function columnsReducer(
  state = columnInitialState,
  action: Action<Column[] | AddColumn>
) {
  switch (action.type) {
    case actionTypes.COLUMNS_RECEIVED:
      return action.payload;
    case actionTypes.ADD_COLUMN:
      return [...state,(action.payload as AddColumn).name];
    case actionTypes.REMOVE_COLUMN:
      return state;

    default:
      return state;
  }
}

import { actionTypes } from "../actionTypes";

const columnInitialState: string[] = [];

//TODO: implement column removal
export function columnsReducer(
  state = columnInitialState,
  action: Action<ColumnsType | AddColumn>
) {
  switch (action.type) {
    case actionTypes.COLUMNS_RECEIVED:
      return Object.keys(action.payload as ColumnsType);
    case actionTypes.ADD_COLUMN:
      return [...state,(action.payload as AddColumn).name];
    case actionTypes.REMOVE_COLUMN:
      return state;

    default:
      return state;
  }
}

import { actionTypes } from "../actionTypes";

const columnInitialState = {};

//TODO: 1. fix type and switch cases
//TODO: 2. might need to pass multiple payload types
export function columnsReducer(
  state = columnInitialState,
  action: Action<ColumnsType | Column>
) {
  switch (action.type) {
    case actionTypes.COLUMNS_RECEIVED:
      return { ...action.payload };
    case actionTypes.COLUMNS_UPDATED:
      const { name } = action.payload as Column;
      return { ...state, [name]: action.payload };
    case actionTypes.ADD_COLUMN:
      return state;
    case actionTypes.REMOVE_COLUMN:
      return state;
    case actionTypes.ADD_CARD:
      return state;
    case actionTypes.REMOVE_CARD:
      return state;
    case actionTypes.EDIT_CARD:
      return state;
    default:
      return state;
  }
}

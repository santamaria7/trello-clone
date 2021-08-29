import { actionTypes } from "../actionTypes";

const initialViewState = {
  showColumnForm: false,
  showAlert: false,
};

export function viewReducer(state = initialViewState, action: Action<boolean>) {
  switch (action.type) {
    case actionTypes.TOGGLE_COLUMN_FORM:
      return { ...state, showColumnForm: action.payload };
    default:
      return state;
  }
}

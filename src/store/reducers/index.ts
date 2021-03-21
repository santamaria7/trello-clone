import { combineReducers } from "redux";
import { columnsReducer } from "./columnsReducer";
const rootReducer = combineReducers({
    columns: columnsReducer
});
export default rootReducer;
import { combineReducers } from "redux";
import { columnsReducer } from "./columnsReducer";
import { tasksReducer } from "./tasksReducer";
const rootReducer = combineReducers({
    columns: columnsReducer,
    tasks: tasksReducer
});
export default rootReducer;
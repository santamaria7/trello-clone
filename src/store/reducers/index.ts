import { combineReducers } from "redux";
import { columnsReducer } from "./columnsReducer";
import { tasksReducer } from "./tasksReducer";
import { viewReducer } from "./viewReducer";
const rootReducer = combineReducers({
    columns: columnsReducer,
    tasks: tasksReducer,
    view: viewReducer
});
export default rootReducer;
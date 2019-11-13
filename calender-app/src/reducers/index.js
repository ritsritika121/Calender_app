import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import loginReducer from "./loginReducer";

const appReducer = combineReducers({
    signUpReducer,
    loginReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_STORE') {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;

import { combineReducers } from "redux"
import userReducer from "./reducers/user"
import postReducer from "./reducers/post"

const rootReducer = combineReducers({
    user: userReducer,
    // post: postReducer
})

export default rootReducer
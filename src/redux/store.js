import { combineReducers, applyMiddleware, createStore } from "redux"
import userReducer from "./reducers/user"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    user: userReducer,
    // post: postReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
const initial_state = {
    id: 0,
    username: "",
    email: "",
    full_name: "",
    profile_picture: "",
    usertag: ""
}

const userReducer = ( state = initial_state, action) => {
    if (action.type === "USER_LOGIN") {
        return {
            ...state,
            username: action.payload.username,
            email: action.payload.email,
            full_name: action.payload.full_name,
            id: action.payload.id,
            profile_picture: action.payload.profile_picture,
            usertag: action.payload.usertag,
        }
    } else if (action.type === "USER_LOGOUT") {
        return initial_state
    }
    return state
}
export default userReducer
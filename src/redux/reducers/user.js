const initial_state = {
    id: 0,
    username: "",
    email: "",
    full_name: "",
    profile_picture: "",
    tag_name: "",
    bio: "",
    is_verified: false
}

const userReducer = ( state = initial_state, action) => {
    if (action.type === "USER_LOGIN") {
        // console.log(action.payload)
        return {
            ...state,
            username: action.payload.username,
            email: action.payload.email,
            full_name: action.payload.full_name,
            id: action.payload.id,
            profile_picture: action.payload.profile_picture,
            tag_name: action.payload.tag_name,
            bio: action.payload.bio,
            is_verified: action.payload.is_verified
        }
    } else if (action.type === "USER_LOGOUT") {
        return initial_state
    }
    return state
}
export default userReducer
const initial_state = {
  id: 0,
  location: "",
  image_url: "",
  number_of_likes: 0,
  caption: "",
  userId: 0,
};

const postReducer = (state = initial_state, action) => {
  if (action.type === "USER_LOGIN") {
    return {
      ...state,
      id: action.payload.id,
      location: action.payload.location,
      image_url: action.payload.image_url,
      number_of_likes: action.payload.number_of_likes,
      caption: action.payload.caption,
      userId: action.payload.userId,
    };
  }
  return state
};
export default postReducer
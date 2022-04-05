import jsCookie from "js-cookie";
import api from "../../configs/api";

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/user/login", {
        username: values.username,
        password: values.password
      });

      const userResponse = res.data.result

      jsCookie.set("user_token", userResponse.token)

      dispatch({
        type: "USER_LOGIN",
        payload: userResponse.user,
      });

      setSubmitting(false)
    } catch (err) {
      console.log(err)
      setSubmitting(false)
    }
  }
}
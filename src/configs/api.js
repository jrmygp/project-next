import axios from 'axios'
import jsCookie from 'js-cookie';


const API_URL = "http://localhost:2000";

const axiosInstance = axios.create({
  baseURL: API_URL
})

axiosInstance.interceptors.request.use((config) => {
  // config.headers.token = "testing123"
  config.headers.authorization = jsCookie.get("user_token") || ""

  return config
})

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res
//   },
//   (err) => {
//     if (err.response.status == 419) {
//       jsCookie.remove("user_token")

//       store.dispatch({
//         type: "USER_LOGOUT"
//       })
//     }

//     // store.dispatch({
//     //   type: network_types.NETWORK_ERROR,
//     //   payload: {
//     //     title: "Network Error",
//     //     description: err.response.data.message
//     //   }
//     // })

//     return err
//   }
// )

export default axiosInstance;
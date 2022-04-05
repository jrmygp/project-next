import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import  axiosInstance  from "../configs/api";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect( async () => {
    // const savedUserData = localStorage.getItem("user_data")
    // const savedUserData = jsCookie.get("user_data");
    const userToken = jsCookie.get("user_token");

    if (userToken) {
      try {
        // const parsedUserData = JSON.parse(savedUserData);
       const dataResponse = await axiosInstance.get("/user/refresh-token")
       console.log(dataResponse, "TESTING", userToken)
        jsCookie.set("user_token", dataResponse?.data?.result?.token || "")
        dispatch({
          type: "USER_LOGIN",
          payload: dataResponse?.data?.result,
        });
      
      } catch (err) {
        console.log(err)
      }
    }
  }, []);

  return children;
};

export default AuthProvider;
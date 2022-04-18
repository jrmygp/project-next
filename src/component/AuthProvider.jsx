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
      //  console.log(dataResponse, "TESTING", userToken)
        jsCookie.set("user_token", dataResponse?.data?.token || "")
        const userData = dataResponse?.data?.result
        // console.log(userData);
        dispatch({
          type: "USER_LOGIN",
          payload: {
            username: userData.username,
            id: userData.id,
            email: userData.email,
            full_name: userData.full_name,
            profile_picture: userData.profile_picture,
            tag_name: userData.tag_name,
            bio: userData.bio,
            is_verified: userData.is_verified
          }
        });
      
      } catch (err) {
        console.log(err)
      }
    }
  }, []);

  return children;
};

export default AuthProvider;
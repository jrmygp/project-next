import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const savedUserData = localStorage.getItem("user_data")
    const savedUserData = jsCookie.get("user_data");

    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      dispatch({
        type: "USER_LOGIN",
        payload: parsedUserData,
      });
    }
  }, []);

  return children;
};

export default AuthProvider;
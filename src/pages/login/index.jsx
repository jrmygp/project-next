import { Box, Button, Center, FormLabel, Input, Text } from "@chakra-ui/react";
import { axiosInstance } from "../../configs/api";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";

const LoginPage = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const userSelector = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const inputHandler = (event, field) => {
    const { value } = event.target;
    if (field === "username") {
      setUsernameInput(value);
    } else if (field === "password") {
      setPasswordInput(value);
    }
  };

  const loginBtnHandler = () => {
    axiosInstance
      .get("/users", {
        params: {
          username: usernameInput,
          password: passwordInput,
        },
      })
      .then((res) => {
       const userData = res.data[0]

       dispatch({
         type: "USER_LOGIN",
         payload: userData
       })
       localStorage.setItem("user_data", JSON.stringify(userData))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userSelector.id) {
   Router.push("/home")
  }
  
  return (
    <Center mt={10}>
      <Box maxWidth="lg" color="#3CFF00">
        <Text>Login Page</Text>
        <Text>Logged in user: {userSelector?.username}</Text>
        <FormLabel>Username</FormLabel>
        <Input onChange={(event) => inputHandler(event, "username")} />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          onChange={(event) => inputHandler(event, "password")}
        />
        <Button onClick={loginBtnHandler} backgroundColor="black">
          Login
        </Button>
      </Box>
    </Center>
  );
};

export default LoginPage;

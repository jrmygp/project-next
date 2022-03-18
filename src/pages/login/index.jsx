import {
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  Text,
  Flex,
  Grid,
  Image,
} from "@chakra-ui/react";
import { axiosInstance } from "../../configs/api";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const userSelector = useSelector((state) => state.user);
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
        const userData = res.data[0];

        if (userData) {
          dispatch({
            type: "USER_LOGIN",
            payload: userData,
          });

          const parsedData = JSON.stringify(userData);

          Cookies.set("user_data", parsedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userSelector.id) {
    Router.push("/home");
  }

  return (
    <Flex mt="10px">
      <Image 
      src="https://c4.wallpaperflare.com/wallpaper/984/558/532/moon-night-city-city-lights-wallpaper-preview.jpg"
      w="1000px"
      objectFit="cover"
      mt="100px"/>

      <Box
        maxWidth="lg"
        color="#3CFF00"
        border="1px solid white"
        w={400}
        borderRadius={10}
        padding={10}
        position="absolute"
        right={20}
        top={220}
      >
        <Center mb={5}>
          <Text>Please Log In</Text>
        </Center>
        <FormLabel>Username</FormLabel>
        <Input onChange={(event) => inputHandler(event, "username")} mb={5} />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          onChange={(event) => inputHandler(event, "password")}
          mb={5}
        />
        <Center>
          <Flex>
            <Button onClick={loginBtnHandler} colorScheme="green" size="md">
              Login
            </Button>
            <Button colorScheme="green" ml={5} size="md">
              Register
            </Button>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginPage;

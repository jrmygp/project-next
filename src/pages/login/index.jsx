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
  Link,
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
    <Flex>
      <Image 
      src="https://wallpapercave.com/wp/wp8424243.png"
      w="500px"
      objectFit="cover"/>

      <Box
        maxWidth="lg"
        color="#3CFF00"
        border="1px solid white"
        w={400}
        borderRadius={10}
        padding={10}
        position="absolute"
        right={500}
        top={220}
      >
        <Center mb={5}>
          <Text>Welcome to Weebsgram™</Text>
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
            <Link href="/sign-up">
            <Button colorScheme="green" ml={5} size="md">
              Register
            </Button>
            </Link>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginPage;

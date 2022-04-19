import {
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  Text,
  Flex,
  Icon,
  Image,
  Link,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { userLogin } from "../../redux/actions/user";
import axiosInstance from "../../configs/api";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Cookies from "js-cookie";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import jsCookie from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const userSelector = useSelector((state) => state.user);

  const router = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(userLogin(values, formik.setSubmitting));
      }, 2000);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (userSelector.id) {
      router.push("/home");
    }
  }, [userSelector.id]);
  return (
    <Flex background="black">
      <Image
        src="https://wallpapercave.com/wp/wp8424243.png"
        w="510px"
        objectFit="cover"
      />

      <Box
        maxWidth="lg"
        color="white"
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
        <Input onChange={inputHandler} mb={5} name="username" />
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            onChange={inputHandler}
            mb={5}
            type={passwordVisible ? "text" : "password"}
            name="password"
          />
          <InputRightElement
            children={
              <Icon
                fontSize="lg"
                onClick={() => setPasswordVisible(!passwordVisible)}
                as={passwordVisible ? IoMdEyeOff : IoMdEye}
                sx={{ _hover: { cursor: "pointer" } }}
              />
            }
            backgroundColor="transparent"
          />
        </InputGroup>
        <Center>
          <Flex>
            <Button
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              colorScheme="green"
              size="md"
            >
              Login
            </Button>
            <Link href="/sign-up">
              <Button colorScheme="blue" ml={5} size="md">
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

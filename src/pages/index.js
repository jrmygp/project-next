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
import { userLogin } from "../redux/actions/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
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

    // LEFT SIDE

    <Flex background="black">
      <Box display="flex" justifyContent="center">
      <Image
        src="https://images.unsplash.com/photo-1650477733936-06fa48166e5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        w="700px"
        m={2}
      />
        <Flex flexDir="column" position="absolute" color="white" top={60}>
          <Text fontSize="5xl">New Here?</Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2xl">
              Sign up here so you won't miss out making new friends!
            </Text>
            <Link href="/sign-up">
              <Button
                bgColor="white"
                w="100px"
                ml={3}
                color="black"
                borderRadius="20px"
                mt={4}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>

      {/* RIGHT SIDE */}

      <Box
       border="1px solid white"
       borderRadius="5px"
       w="450px"
       display="flex"
       flexDir="column"
       alignItems="center"
       justifyContent="center"
       ml={4}
       position="absolute"
       bg="black"
       color="white"
       mt={10}
       top={40}
       right={60}
      >
        <Box width="100%" p={5}>
        <Center mb={5}>
          <Text fontSize="2xl">Welcome to Konekt.</Text>
        </Center>
        <FormLabel>Username</FormLabel>
        <Input onChange={inputHandler} mb={5} name="username" />
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            onChange={inputHandler}
            mb={2}
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
        </Box>
        <Box mb={3}>
          <Link href={"/forgot-password"}>
          <Text>Forgot your password?</Text>
          </Link>
        </Box>
        <Center mb={2}>
          <Flex>
            <Button
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              bgColor="white"
              color="black"
              w={100}
            >
              Login
            </Button>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginPage;

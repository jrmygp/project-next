import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  Icon,
  InputRightElement,
  InputGroup,
  Flex,
  Image,
  Center,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from "../../configs/api";
import Link from "next/link";
import Router from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      fullname: "",
      username: "",
      usertag: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please use a valid email")
        .required("This field is required!"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must contain atleast one uppercase alphabet, number, and special character!"
        )
        .required("This field is required!"),
      confirm_password: yup
        .string()
        .required("Please repeat your password")
        .oneOf([yup.ref("password"), null], "Your password does not match!"),
      fullname: yup.string().required("This field is required!"),
      username: yup.string().required("This field is required!"),
      usertag: yup
        .string()
        .max(8, "Usertag should not be 8 or more characters!")
        .required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
        full_name: values.fullname,
        username: values.username,
        tag_name: values.usertag,
      };

      await axiosInstance.post(`/user/register`, newUser);
      formik.setSubmitting(false);
      Router.push("/");
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius={5}>
            <Text bg="green.500">Successfully created new account!</Text>
            An email has been sent to your mail, please click the link to verify
            your account. <Icon bg="green.500" as={BsFillCheckCircleFill} />
          </Box>
        ),
      });
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    // LEFT SIDE

    <Flex background="black">
      <Box display="flex" justifyContent="center">
      <Image
        src="https://images.unsplash.com/photo-1602803056945-ebac8ae8fd00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        w="600px"
        m={2}
      />

      <Flex flexDir="column" position="absolute" color="white" top={40}>
        <Text fontSize="6xl">Register to Konekt.</Text>
        <Text fontSize="2xl">so you can make new great friends all over the world!</Text>
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
        right={60}
      >
        <Stack p={3}>
          <Center mt={5}>
            <Heading>Make new account</Heading>
          </Center>
          <form>
            <Flex flexDir="column" alignItems="center">
              <Box w="100%" p={3}>
                <FormControl isInvalid={formik.errors.email}>
                  <FormLabel htmlFor="inputEmail">Email</FormLabel>
                  <Input id="inputEmail" name="email" onChange={inputHandler} />
                  <FormHelperText>{formik.errors.email}</FormHelperText>
                </FormControl>

                <FormControl isInvalid={formik.errors.password}>
                  <FormLabel htmlFor="inputPassword">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="inputPassword"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      onChange={inputHandler}
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
                  <FormHelperText>{formik.errors.password}</FormHelperText>
                </FormControl>

                <FormControl isInvalid={formik.errors.confirm_password}>
                  <FormLabel htmlFor="inputPassword">
                    Confirm Your Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id="inputPassword"
                      name="confirm_password"
                      type={confirmPasswordVisible ? "text" : "password"}
                      onChange={inputHandler}
                    />
                    <InputRightElement
                      children={
                        <Icon
                          fontSize="lg"
                          onClick={() =>
                            setConfirmPasswordVisible(!confirmPasswordVisible)
                          }
                          as={confirmPasswordVisible ? IoMdEyeOff : IoMdEye}
                          sx={{ _hover: { cursor: "pointer" } }}
                        />
                      }
                      backgroundColor="transparent"
                    />
                  </InputGroup>
                  <FormHelperText>
                    {formik.errors.confirm_password}
                  </FormHelperText>
                </FormControl>

                <FormControl isInvalid={formik.errors.fullname}>
                  <FormLabel htmlFor="inputFullname">Full Name</FormLabel>
                  <Input
                    id="inputFullname"
                    name="fullname"
                    onChange={inputHandler}
                  />

                  <FormHelperText>{formik.errors.fullname}</FormHelperText>
                </FormControl>

                <FormControl isInvalid={formik.errors.username}>
                  <FormLabel htmlFor="inputUsername">Username</FormLabel>
                  <Input
                    id="inputUsername"
                    name="username"
                    onChange={inputHandler}
                  />
                  <FormHelperText>{formik.errors.username}</FormHelperText>
                </FormControl>

                <FormControl isInvalid={formik.errors.usertag}>
                  <FormLabel htmlFor="inputUsertag">User Tag</FormLabel>
                  <Input
                    id="inputUsertag"
                    name="usertag"
                    onChange={inputHandler}
                  />
                  <FormHelperText>{formik.errors.usertag}</FormHelperText>
                </FormControl>
              </Box>
              <Box display="flex" p="10px">
                <Link href="/">
                  <Button bgColor="#00BFFF" color="white" w={200} mt={2} mr={2}>
                    Already have account
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    bgColor="white"
                    color="black"
                    w={200}
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                    type="submit"
                    mt={2}
                  >
                    Make your account
                  </Button>
                </Link>
              </Box>
            </Flex>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignUpPage;

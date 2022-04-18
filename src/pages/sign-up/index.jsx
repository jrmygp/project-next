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
  Image
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import  axiosInstance  from "../../configs/api";
import Link from "next/link";
import Router from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        .min(8, "Password should be 8 or more characters!")
        .required("This field is required!"),
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
      Router.push("/login");
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius={5}>
            <Text bg="green.500">Successfully created new account!</Text>
            An email has been sent to your mail, please click the link to verify your account.{" "}
            <Icon bg="green.500" as={BsFillCheckCircleFill} />
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
    <Flex background="black">
      <Image
        src="https://wallpapercave.com/wp/wp8424243.png"
        w="500px"
        objectFit="cover"
      />
    <Box
    border="1px solid white"
    borderRadius={10}
    mt={40}
    mb={40}
    color="white"
    background="black"
    
    >
      <Stack p={10}>
        <Heading>Make new account</Heading>
        <form>
      <Flex flexDir="column" alignItems="center">
          <Box>
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
              <Input id="inputUsertag" name="usertag" onChange={inputHandler} />
              <FormHelperText>{formik.errors.usertag}</FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <Link href="/login">
            <Button
            colorScheme="blue"
            w={200}
            mt={2}
            mr={2}
            >
              Back
            </Button>
            </Link>
            <Link href="/login">
              <Button
                colorScheme="green"
                w={200}
                onClick={formik.handleSubmit}
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

import {
  Box,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Button,
  Stack,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import axiosInstance from "../../configs/api";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const ForgotPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { fp_token } = router.query;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object().shape({
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
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const userPassword = {
        password: values.password,
        forgotPasswordToken: fp_token,
      };
      await axiosInstance.patch(`/user/change-password-forgot`, userPassword);
      formik.setSubmitting(false);
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius={5}>
            <Text bg="green.500">Password changed successfuly!</Text>
            Please log in to your account.{" "}
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
        src="https://images.unsplash.com/photo-1597402483906-5ef5ff9bdf51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        w="600px"
        m={2}
      />
      <Flex
        border="1px solid white"
        borderRadius="5px"
        w="450px"
        display="flex"
        flexDir="column"
        alignItems="center"
        ml={4}
        position="absolute"
        bg="black"
        color="white"
        mt={10}
        top={40}
        right={60}
        p={5}
      >
        <Box p={2} mb={2}>
          <Text color="white" fontSize="2xl">Reset your password</Text>
        </Box>
        {/* password */}
        <FormControl isInvalid={formik.errors.password} mb={2}>
          <FormLabel htmlFor="inputPassword" color="white">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              id="inputPassword"
              name="password"
              onChange={inputHandler}
              color="white"
              type={passwordVisible ? "text" : "password"}
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

        {/* confirm password */}
        <FormControl isInvalid={formik.errors.confirm_password}>
          <FormLabel htmlFor="inputConfirm_Password" color="white">
            Confirm Password
          </FormLabel>
          <InputGroup>
            <Input
              id="inputConfirm_Password"
              name="confirm_password"
              onChange={inputHandler}
              color="white"
              type={confirmPasswordVisible ? "text" : "password"}
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
          <FormHelperText>{formik.errors.confirm_password}</FormHelperText>
        </FormControl>
        <Box paddingX="20px" marginTop={5}>
          <Link href={"/login"}>
            <Button bgColor="white" color="black" onClick={formik.handleSubmit}>
              Set New Password
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;

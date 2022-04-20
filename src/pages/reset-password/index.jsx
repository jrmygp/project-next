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
        src="https://wallpapercave.com/wp/wp8424243.png"
        w="500px"
        objectFit="cover"
      />
      <Flex
        border="1px solid white"
        borderRadius={10}
        mt={40}
        height="350px"
        color="white"
        background="black"
        flexDir="column"
        alignItems="center"
      >
        <Box p={5}>
          <Text color="white">Reset your password</Text>
        </Box>
        {/* password */}
        <FormControl paddingX={20} isInvalid={formik.errors.password}>
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
        <FormControl paddingX={20} isInvalid={formik.errors.confirm_password}>
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
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
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
            <Button colorScheme="green" onClick={formik.handleSubmit}>
              Set New Password
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;

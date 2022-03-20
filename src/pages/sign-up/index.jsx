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
  Icon
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { axiosInstance } from "../../configs/api";
import Link from "next/link";
import Router from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs"

const SignUpPage = () => {
    const toast = useToast()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
      username: "",
      usertag: "",
      profilepicture: "",
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
      profilepicture: yup.string().required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
        full_name: values.fullname,
        username: values.username,
        usertag: values.usertag,
        profile_picture: values.profilepicture,
      };

      await axiosInstance.post(`/users`, newUser);
      formik.setSubmitting(false);  
      Router.push("/login")
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius={5}>
            Successfully created new account! Now please log in to your new account. <Icon bg="green.500" as={BsFillCheckCircleFill} />
          </Box>
        ),
      });
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    formik.setFieldValue(name, value);
  };

  return (
    <Container border="1px solid white" borderRadius={10} mt={5}>
      <Stack p={10}>
        <Heading>Make new account</Heading>
        <form>
          <Box maxW="lg" p="5">
            <FormControl isInvalid={formik.errors.email}>
              <FormLabel htmlFor="inputEmail">Email</FormLabel>
              <Input id="inputEmail" name="email" onChange={inputHandler} />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.password}>
              <FormLabel htmlFor="inputPassword">Password</FormLabel>
              <Input
                id="inputPassword"
                name="password"
                onChange={inputHandler}
              />
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

            <FormControl isInvalid={formik.errors.profilepicture}>
              <FormLabel htmlFor="inputProfilePict">Profile Picture</FormLabel>
              <Input
                id="inputProfilePict"
                name="profilepicture"
                onChange={inputHandler}
              />
              <FormHelperText>{formik.errors.profilepicture}</FormHelperText>
            </FormControl>
          </Box>
          <Box paddingLeft={5}>
            <Link href="/login">
              <Button
                colorScheme="green"
                w={200}
                onClick={formik.handleSubmit}
                type="submit"
              >
                Make your account
              </Button>
            </Link>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default SignUpPage;

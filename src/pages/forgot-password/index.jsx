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
  Image,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import axiosInstance from "../../configs/api";
import { BsFillCheckCircleFill, BsFolderSymlink } from "react-icons/bs";

const ForgotPassword = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please use a valid email")
        .required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const userEmail = {
        email: values.email,
      };
      await axiosInstance.post(`/user/forgot-password-email`, userEmail);
      formik.setSubmitting(false);
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius={5}>
            <Text bg="green.500">An email has been sent to your mail</Text>
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

    // LEFT SIDE

    <Flex background="black">
      <Image
        src="https://images.unsplash.com/photo-1597402483906-5ef5ff9bdf51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        w="600px"
        m={2}
      />

      {/* RIGHT SIDE */}

      <Flex
        border="1px solid white"
        borderRadius="5px"
        w="500px"
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
        p={5}
      >
        <Text color="white" mb={1} fontSize="xl">
          Trouble Logging In?
        </Text>
        <Text color="white">
          Input your email, so we can send you a reset password form
        </Text>
        <FormControl paddingX={20} isInvalid={formik.errors.email} mt={5}>
          <FormLabel htmlFor="inputEmail" color="white">
            Email
          </FormLabel>
          <Input
            id="inputEmail"
            name="email"
            onChange={inputHandler}
            color="white"
          />
          <FormHelperText>{formik.errors.email}</FormHelperText>
        </FormControl>
        <Box paddingX="20px" marginTop={5}>
          <Link href={"/"}>
            <Button colorScheme="blue" mr={5}>
              Back
            </Button>
          </Link>
          <Button
            disabled={formik.isSubmitting}
            bgColor="white"
            color="black"
            onClick={formik.handleSubmit}
          >
            Send Email
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;

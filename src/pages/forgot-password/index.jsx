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
        height="300px"
        color="white"
        background="black"
        flexDir="column"
        alignItems="center"
      >
        <Box p={10} mt={2}>
          <Text color="white">
            It looks like you might have forgotten your password
          </Text>
          <Text color="white">
            Input your email, so we can send you a reset password form
          </Text>
        </Box>
        <FormControl paddingX={20} isInvalid={formik.errors.email}>
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
          <Link href={"/login"}>
            <Button colorScheme="blue" mr={5}>
              Back
            </Button>
          </Link>
          <Button
            disabled={formik.isSubmitting}
            colorScheme="green"
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

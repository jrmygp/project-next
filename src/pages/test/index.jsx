import {
  Flex,
  Button,
  Center,
  Tex,
  Text,
  Box,
  useToast,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axiosInstance from "../../configs/api";
import { BsFillCheckCircleFill, BsImageFill } from "react-icons/bs";
import requiresAuth from "../../component/requiresAuth";
import Link from "next/link";

const ResendToken = () => {
  const userSelector = useSelector((state) => state.user);
  const toast = useToast();

  const resendToken = async () => {
    try {
      await axiosInstance.post(`/user/resend-verification`);
    } catch (err) {
      console.log(err);
    }
    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} bg="green.500" borderRadius={5}>
          Email sent <Icon bg="green.500" as={BsFillCheckCircleFill} />
        </Box>
      ),
    });
  };
  return (
    <Center>
      <Box display="flex" justifyContent="center">
        <Image
          src={
            "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          }
          w="100%"
        />
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          p={5}
          position="absolute"
          top={40}
        >
          {userSelector.is_verified == false ? (
            <Box display="flex" flexDir="column" maxW={700} alignItems="center">
              <Text color="white" fontSize="4xl" borderBottom="1px solid white">
                Looks like you haven't verify your account.
              </Text>
              <Text color="white" fontSize="xl" mt={3} mb={2}>
                Click the button below to resend verification token to your
                email.
              </Text>
              <Button
                mt={3}
                onClick={resendToken}
                bgColor="white"
                color="black"
                borderRadius="20px"
                width="180px"
              >
                Send Token
              </Button>
            </Box>
          ) : (
            <Box display="flex" flexDir="column" alignItems="center">
              <Text color="white" fontSize="5xl">
                You are already verified
              </Text>
              <Text fontSize="3xl" color="white">
                Thank You!
              </Text>
              <Link href="/home">
                <Button
                  bgColor="white"
                  color="black"
                  borderRadius="20px"
                  width="150px"
                  mt="7px"
                >
                  Go Back Home
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default ResendToken;

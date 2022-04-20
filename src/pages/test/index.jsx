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
    <Center mt={10} mb={5}>
      <Flex flexDir="column" alignItems="center">
        {userSelector.is_verified == false ? (
          <Box>
            <Text color="white" fontSize="xl">
              Looks like you haven't verify your account. Click the button below to
              resend verification token to your email.
            </Text>
            <Button colorScheme="blue" mt={3} onClick={resendToken}>
              Send Token
            </Button>
          </Box>
        ) : (
          <Text color="white" fontSize="xl">You are already verified!</Text>
        )}

        <Image
          src={
            "https://s7.favim.com/orig/151024/fairy-tail-happy-anime-neko-anime-Favim.com-3474844.jpg"
          }
          maxW={500}
          maxH={500}
          mt={5}
        />
      </Flex>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default ResendToken;

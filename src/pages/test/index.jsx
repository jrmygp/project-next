import { Flex, Button, Center, Tex, Text, Box, useToast, Icon } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import axiosInstance from "../../configs/api"
import { BsFillCheckCircleFill, BsImageFill } from "react-icons/bs";

const ResendToken = () => {
  const userSelector = useSelector((state) => state.user)
  const toast = useToast();

  const resendToken = async () => {
    try {
      await axiosInstance.post(`/user/resend-verification`)
    } catch (err) {
      console.log(err)
    }
    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} bg="green.500" borderRadius={5}>
          Email sent <Icon bg="green.500" as={BsFillCheckCircleFill} />
        </Box>
      ),
    });
  }
    return (
      <Center mt={20}>
      <Box>
          <Text color="white">Looks like you haven't verify your account. Click button below to resend verification token to your email.</Text>
          {userSelector.is_verified == false ? <Button colorScheme="blue" mt={3} onClick={resendToken}>Send Token</Button> : null}
          
      </Box>

      </Center>
    )
}

export default ResendToken
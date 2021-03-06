import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

const NavTop = () => {
  const userSelector = useSelector((state) => state.user);
  const toast = useToast();
  const router = useRouter();

  const dispatch = useDispatch();

  const logoutBtnHandler = () => {
    dispatch({
      type: "USER_LOGOUT",
    });

    Cookies.remove("user_token");

    toast({
      position: "top-right",
      render: () => (
        <Box color="white" p={3} bg="green.500" borderRadius={5}>
          Log out successful <Icon bg="green.500" as={BsFillCheckCircleFill} />
        </Box>
      ),
    });
  };

  if (
    router.asPath == "/login" ||
    router.asPath == "/sign-up" ||
    router.asPath == "/forgot-password" ||
    router.asPath == "/reset-password" ||
    router.asPath == "/"
  )
    return null;

  return (
    <Box
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      paddingX={50}
      paddingY={2}
      position="sticky"
      top="0"
      zIndex="999"
      background="black"
      color="white"
    >
      <Box display="flex" justifyContent="space-between">
      <Link href="/home" style={{ textDecoration: "none" }}>
        <Box paddingLeft="50px" paddingTop="5px" fontSize="xl" mr={5}>
          <Text size="3lg" as="kbd" sx={{ _hover: { cursor: "pointer" } }}>
            K o n e k t .
          </Text>
        </Box>
      </Link>
      <Box display="flex" alignItems="center" justifyContent="center" ml={5}>
        <InputGroup>
        <Input w="50" marginRight="10px" placeholder="Search" borderRadius="10px"/>
        <InputRightElement
        children={
          <Icon 
          as={BsSearch} 
          fontSize="lg"
          mr={5}
           />
        }
        />
        </InputGroup>
      </Box>

      </Box>
      <Box paddingRight="50px">
        {userSelector.id ? (
          <Link href="/">
            <Button
              onClick={logoutBtnHandler}
              bgColor="black"
              borderRadius="15px"
              variant="outline"
            >
              Logout
            </Button>
          </Link>
        ) : (
          <Link href="/">
            <Button colorScheme="green">Login</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default NavTop;

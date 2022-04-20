import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Box, Button, Flex, Icon, Input, useToast } from "@chakra-ui/react";
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

  if (router.asPath == "/login" || router.asPath == "/sign-up" || router.asPath == "/forgot-password" || router.asPath == "/reset-password") return null;

  return (
    <Box
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      borderBottom="1px solid white"
      padding="7px"
      position="sticky"
      top="0"
      zIndex="999"
      background="black"
      color="white"
    >
      <Box paddingLeft="50px" paddingTop="5px">
        <Link href="/home" style={{ textDecoration: "none" }}>
          Weebsgram™
        </Link>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Input w="50" marginRight="10px" placeholder="search" />
        <Icon as={BsSearch} fontSize="xl" />
      </Box>
      <Box paddingRight="50px">
        {userSelector.id ? (
          <Link href="/login">
            <Button onClick={logoutBtnHandler} colorScheme="red">
              Logout
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button colorScheme="green">Login</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default NavTop;

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link"
import { Box, Button, Icon, Input } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs"
import Cookies from "js-cookie"

const NavTop = () => {
  const userSelector = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutBtnHandler = () => {
    dispatch({
      type: "USER_LOGOUT",
    });

    alert("logout")

    Cookies.remove("user_data");
  };

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
          Purwadhika
        </Link>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Input w="50" marginRight="10px"/>
        <Icon as={BsSearch} fontSize="xl"/>
      </Box>
      <Box paddingRight="50px">
      {userSelector.id ? (
            <Button onClick={logoutBtnHandler} colorScheme="red">
              Logout
            </Button>
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

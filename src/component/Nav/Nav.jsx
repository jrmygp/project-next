import { useState, useEffect } from "react";
import {
  Avatar,
  Flex,
  Divider,
  Heading,
  Text,
  IconButton,
  Button,
  MenuList,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa"
import { GoVerified } from "react-icons/go";
import {
  BsPlusSquareFill,
  BsFillArrowLeftSquareFill,
  BsArrowRightSquareFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import NavItems from "./NavItems";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const [navSize, changeNavSize] = useState("large");

  const userSelector = useSelector((state) => state.user);

  if (router.asPath == "/verify-user") {
    return null;
  }
  if (!userSelector.id) {
    return null;
  }

  return (
    <Flex
      position="sticky"
      top={10}
      left="95px"
      h="90vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.2)"
      backgroundColor="black"
      color="white"
      borderRadius={navSize === "small" ? "15px" : "20px"}
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        as="nav"
        marginTop="30px"
        backgroundColor="black"
      >
        {/* <IconButton
          background="none"
          marginBottom={3}
          mt={5}
          _hover={{ background: "none" }}
          icon={<GiHamburgerMenu />}
          onClick={() => {
            if (navSize === "small") {
              changeNavSize("large");
            } else {
              changeNavSize("small");
            }
          }}
        /> */}
        {navSize === "small" ? (
          <IconButton
            icon={<FaChevronCircleRight />}
            size="lg"
            onClick={()=>changeNavSize("large")}
            _hover={{ background: "none" }}
            background="none"
            mt={5}
          />
        ) : (
          <IconButton
            icon={<FaChevronCircleLeft />}
            size="lg"
            onClick={()=>changeNavSize("small")}
            _hover={{ background: "none" }}
            background="none"
            mt={5}
          />
        )}
        <NavItems
          navSize={navSize}
          icon={FaHome}
          title="Home"
          description=""
          href="/home"
        />

        <NavItems
          navSize={navSize}
          icon={CgProfile}
          title="Your Profile"
          href="/my-profile"
        />

        <NavItems
          navSize={navSize}
          icon={BsPlusSquareFill}
          title="Upload Post"
          href="/upload"
        />
        {userSelector.is_verified == false ? (
          <NavItems
            navSize={navSize}
            icon={GoVerified}
            title="Verify Account"
            href="/verify-user"
          />
        ) : null}
      </Flex>

      <Flex
        padding="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar src={userSelector.profile_picture} size="sm" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {userSelector.username}
            </Heading>
            <Text color="gray">{userSelector.tag_name}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Nav;

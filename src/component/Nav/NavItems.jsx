import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import NavHoverBox from "../Nav/NavHoverBox"

const NavItems = ({ navSize, icon, title, active, description }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
        p={3}
        borderRadius={8}
        _hover={{textDecor: "none", backgroundColor: "black"}}
        w={navSize == "large" && "100%"}>
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "#3CFF00" }/>
              <Text ml={4} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};
export default NavItems;

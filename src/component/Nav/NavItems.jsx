import React from "react";
import {
  Flex,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import NavHoverBox from "../Nav/NavHoverBox"
import Link from "next/link";

const NavItems = ({ navSize, icon, title, active, description, href = ""}) => {
  return (
    <Stack
      mt={30}
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
      paddingLeft={6} 
    >
      <Menu placement="right">
        <Link href={href}>
          <MenuButton w="100%" marginBottom={10}>
            <Flex>
              <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "#3CFF00" }/>
              <Text ml={3} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Stack>
  );
};
export default NavItems;

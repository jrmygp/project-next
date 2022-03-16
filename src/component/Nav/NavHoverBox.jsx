import React from "react";
import { Flex, Heading, Text, Icon } from "@chakra-ui/react";

const NavHoverBox = ( {icon, title, description}) => {
  return (
      <>
        <Flex
        pos="absolute"
        mt="calc(100px - 7.5px)"
        ml="-10px"
        width={0}
        height={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        borderRight="10px solid black"/>
        <Flex
        h={200}
        w={200}
        flexDir="column"
        alignItems="center"
        justify="center"
        backgroundColor="black"
        borderRadius="10px"
        color="#3CFF00"
        textAlign="center"
        >
            <Icon as={icon} fontSize="3xl" mb={4}/>
            <Heading size="md" fontWeight="normal"/>{title}
            <Text/>{description}

        </Flex>
      </>
  );
};

export default NavHoverBox;

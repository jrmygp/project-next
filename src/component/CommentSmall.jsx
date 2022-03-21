import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const SmallComment = ({content, profile_picture, user}) => {
  return <Flex alignItems="center" mb={5} paddingBottom={2}>
    {/* <Link href="/"> */}
      <Avatar ml={3} size="sm" src={profile_picture}/>
    {/* </Link> */}
      <Text ml={2} mr={5}>: {content}</Text>
  </Flex>;
};

export default SmallComment;

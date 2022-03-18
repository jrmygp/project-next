import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const SmallComment = ({content, profile_picture}) => {
  return <Flex alignItems="center" mb={5} paddingBottom={2}>
      <Avatar ml={3} size="sm" src={profile_picture}/>
      <Text ml={2} mr={5}>: {content}</Text>
  </Flex>;
};

export default SmallComment;

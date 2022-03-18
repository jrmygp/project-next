import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const SmallComment = () => {
  return <Flex alignItems="center" borderBottom="1px solid white" mb={5} paddingBottom={2}>
      <Avatar ml={3} size="sm" src={"https://cdn-2.tstatic.net/belitung/foto/bank/images/lelaki_20180409_124802.jpg"}/>
      <Text ml={2} mr={5}> said: INI COMMENT GUA WOI</Text>
  </Flex>;
};

export default SmallComment;

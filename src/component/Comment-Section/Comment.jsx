import { Box, Text } from "@chakra-ui/react";

const Comment = ({ username, content }) => {
  return (
    <Box marginY="1" marginLeft={2.5}>
      <Text display="inline" fontWeight="bold" marginRight="2">
        {username}
      </Text>{":"}{" "}
      <Text display="inline">{content}</Text>
    </Box>
  );
};

export default Comment;
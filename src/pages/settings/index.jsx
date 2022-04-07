import { Text } from "@chakra-ui/react";
import requiresAuth from "../../component/requiresAuth";

const Settings = () => {
  return <Text as="h1">THIS IS SETTINGS PAGE</Text>;
};

export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_token;
  return {
    props: {
      user: userData,
    },
  };
});

export default Settings;

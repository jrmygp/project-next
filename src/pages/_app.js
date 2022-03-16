import HomePage from "./home";
import LoginPage from "./login";
import MyProfilePage from "./my-profile";
import ProfilePage from "./profile";
import Settings from "./settings";
import UploadPage from "./upload";
import Nav from "../component/Nav/Nav";
import NavTop from "../component/NavTop/NavTop";
import { ChakraProvider } from "@chakra-ui/provider";
import { Provider } from "react-redux";
import rootReducer from "../redux/store";
import { createStore } from "redux";
import { Flex, Center, Box } from "@chakra-ui/react";
import "../assets/Background.css";
import { useRouter } from "next/router";

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ChakraProvider>
        {router.query == "/login" ? null : (
          <NavTop position="sticky" zIndex="999" />
        )}

        <Flex>
          <Nav />
          <Box flex={1}>
            <Component {...pageProps} />
          </Box>
        </Flex>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

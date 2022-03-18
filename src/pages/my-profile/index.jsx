import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Text, Avatar, Icon, Center, Image, Flex } from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";
import { useRouter } from "next/router";

const MyProfilePage = ({ user }) => {
  const userSelector = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);

  const router = useRouter();

  const fetchUserPosts = () => {
    axios
      .get(`http://localhost:2000/posts`, {
        params: {
          userId: userSelector.id,
        },
      })
      .then((res) => {
        setUserPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const renderPost = () => {
    return userPost.map((val) => {
      return (
        <Image
          src={val.image_url}
          boxSize="245px"
          margin="5px"
          objectFit="cover"
          border="1px solid white"
        />
      );
    });
  };
  return (
    <Center>
      <Box
        w="95vh"
        h="95vh"
        backgroundColor="black"
        marginLeft={5}
        marginTop={5}
        borderRadius="lg"
        border="1px solid white"
      >
        <Box
          paddingTop={5}
          paddingLeft={5}
          paddingBottom={5}
          margin={2}
          color="white"
          display="flex"
          alignItems="center"
          borderRadius="lg"
          backgroundColor="black"
        >
          <Avatar src={userSelector.profile_picture} size="xl" />

          <Box
            display="flex"
            flexDirection="column"
            marginLeft={50}
            fontSize="3xl"
            backgroundColor="black"
          >
            <Box display="flex" alignItems="center" backgroundColor="black">
              <Text backgroundColor="black">{userSelector.username}</Text>
              <Icon as={GoVerified} ml={2} boxSize={4} />
            </Box>
            <Text fontSize="lg" backgroundColor="black">
              {userSelector.usertag}
            </Text>
            <Box
              display="flex"
              fontSize="sm"
              marginTop={5}
              backgroundColor="black"
            >
              <Text marginRight={2} backgroundColor="black">
                0 Post
              </Text>
              <Text marginRight={2} backgroundColor="black">
                0 Followers
              </Text>
              <Text marginRight={2} backgroundColor="black">
                0 Ratings
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          paddingTop={2}
          backgroundColor="black"
          borderTop="1px solid white"
        >
          <Icon as={MdOutlinePhotoCamera} />
          <Text marginLeft={2} />
          POSTS
        </Box>
        <Flex
          borderRadius={5}
          backgroundColor="black"
          flexWrap="wrap"
          marginLeft={1}
        >
          {renderPost()}
        </Flex>
      </Box>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_data;

  return {
    props: {
      user: userData,
    },
  };
});

export default MyProfilePage;

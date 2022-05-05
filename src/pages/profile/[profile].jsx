import { useState, useEffect } from "react";
import { Box, Text, Avatar, Icon, Center, Image, Flex, Button } from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useRouter } from "next/router";
import requiresAuth from "../../component/requiresAuth";
import Link from "next/link";
import  axiosInstance  from "../../configs/api";

const ProfilePage = ({ userProfileData }) => {
  const [postCount, setPostCount] = useState("");
  const [userPost, setUserPost] = useState([]);
  const router = useRouter();

  const fetchUserPosts = async () => {
    try {
      const postData = await axiosInstance.get("/posts", {
        params: {
          user_id: router.query.profile,
          _sortBy: "id",
          _sortDir: "DESC"
        },
      });
      console.log(postData)
      setPostCount(postData.data.result.count)
      setUserPost(postData.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const renderPost = () => {
    return userPost.map((val) => {
      return (
        <Link href={`/post/${val.id}`}>
          <Image
            src={val.image_url}
            boxSize="245px"
            margin="5px"
            objectFit="cover"
            border="1px solid white"
            sx={{ _hover: { cursor: "pointer" } }}
          />
        </Link>
      );
    });
  };

  return (
    <Center>
      <Box
        w="95vh"
        h="100%"
        backgroundColor="black"
        marginLeft={5}
        marginTop={5}
        borderRadius="lg"
        border="1px solid white"
        mb="2px"
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
          <Flex>

          <Avatar src={userProfileData?.profile_picture} size="xl" />

          <Box
            display="flex"
            flexDirection="column"
            marginLeft={50}
            fontSize="3xl"
            backgroundColor="black"
          >
            <Box display="flex" alignItems="center" backgroundColor="black">
              <Text backgroundColor="black">{userProfileData?.username}</Text>
              {userProfileData?.is_verified == true ? <Icon as={GoVerified} ml={1} boxSize={4} color="#1DA1F2"/> : null}
              
            </Box>
            <Text fontSize="lg" backgroundColor="black">
              {userProfileData?.tag_name}
            </Text>
            <Box
              display="flex"
              fontSize="sm"
              marginTop={5}
              backgroundColor="black"
            >
              <Text marginRight={2} backgroundColor="black">
                {postCount} Post
              </Text>
              <Text marginRight={2} backgroundColor="black">
                0 Followers
              </Text>
              <Text marginRight={2} backgroundColor="black">
                0 Ratings
              </Text>
            </Box>
          </Box>
          <Box ml={5} mr={5} mt={2}>
            <Text>{userProfileData?.bio}</Text>
          </Box>
          </Flex>
        </Box>
        <Box>
          <Link href={`/liked/${userProfileData?.id}`}>
          <Button bgColor="white" color="black" size="xs" ml={8} mb={3}>
            Liked Posts
          </Button>
          </Link>
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
          mb={2}
        >
          {renderPost()}
        </Flex>
      </Box>
    </Center>
  );
};

export const getServerSideProps = requiresAuth( async (context) => {

  const res = await axiosInstance.get(`/user/${context.query.profile}`)
  return {
    props: {
      userProfileData: res.data.result
    },
  };
});

export default ProfilePage;

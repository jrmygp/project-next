import { useState, useEffect } from "react";
import {
  Box,
  Icon,
  Flex,
  Image,
  Text,
  Avatar,
  Button,
  Center,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import { IoIosPaperPlane } from "react-icons/io";
import { RiSkull2Fill, RiSkull2Line } from "react-icons/ri";
import Link from "next/link";
import SmallComment from "../../component/CommentSmall";
import { useRouter } from "next/router";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";

const Post = () => {
  const [userPost, setUserPost] = useState([]);

  const router = useRouter();

  const fetchUserPost = async () => {
    await axiosInstance
      .get(`/posts/${router.query.post}`, {
        params: {
          _expand: "user",
        },
      })
      .then((res) => {
        setUserPost(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan pada server");
      });
  };


  useEffect(() => {
    fetchUserPost();
  }, []);

  return (
    <Center>
      <Flex>
        <Box
          backgroundColor="black"
          color="#3CFF00"
          borderWidth="1px"
          borderRadius="lg"
          maxW="lg"
          paddingY="2"
          marginY="4"
        >
          <Box paddingX="3" display="flex" alignItems="center" marginBottom={1}>
            {/* <Link href={`/profile/${userId}`}> */}
            <Avatar src={userPost?.user?.profile_picture} size="md" />
            {/* </Link> */}
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              marginLeft={2}
            >
              <Box display="flex" alignItems="center">
                <Text>{userPost?.user?.username}</Text>{" "}
                <Icon boxSize={3.5} as={GoVerified} marginLeft={1} />
              </Box>
              <Box display="flex" alignItems="center">
                <Icon boxSize={3} as={HiLocationMarker} marginRight="1" />
                <Text fontSize="xs">{userPost?.location}</Text>
              </Box>
            </Box>
          </Box>
          {/* <Link href={`/posts/${id}`}> */}
          <Image padding={2} src={userPost?.image_url} />
          {/* </Link> */}
          <Box paddingX="3">
            <Text fontWeight="bold">
              {userPost?.number_of_likes?.toLocaleString()} People approve this.
            </Text>
            <Box display="flex" alignItems="center">
              <Text marginRight={2} fontWeight="bold">{userPost?.user?.username}</Text>
              <Text>
                {userPost?.caption?.length > 140
                  ? userPost?.caption?.slice(0, 140) + "..."
                  : userPost?.caption}
              </Text>
            </Box>
            <Box display="flex" marginTop={4} paddingBottom={2}>
              <Icon boxSize={6} as={HiOutlineEmojiHappy}></Icon>
              <Icon boxSize={6} as={RiSkull2Line} marginLeft={2}></Icon>
            </Box>
          </Box>
        </Box>

        <Box
          backgroundColor="black"
          color="#3CFF00"
          borderWidth="1px"
          borderRadius="lg"
          maxW="lg"
          paddingY="2"
          marginY="4"
        >
          <Text ml={5} mb={6}>
            Comment Section
          </Text>
          <SmallComment></SmallComment>
          <SmallComment></SmallComment>
          <SmallComment></SmallComment>
        </Box>
      </Flex>
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

export default Post;

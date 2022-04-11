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
import  axiosInstance  from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";

const Post = () => {
  const [userPost, setUserPost] = useState({});
  const [comments, setComments] = useState([]);

  const router = useRouter();

  const fetchUserPost = async () => {
    try {
      const postData = await axiosInstance.get(`/posts`, {
        params: {
          id: router.query.post,
        },
      });

      setUserPost(postData.data.result.rows[0]);
      console.log(postData.data.result.rows[0])
    } catch (err) {
      console.log(err);
    }
  };
  const fetchComments = async () => {
    try {
      const commentData = await axiosInstance.get(`/comments`, {
        params: {
          post_id: router.query.post,
          _limit: 5
        },
      });
      console.log(commentData)
      setComments(commentData.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  const renderComments = () => {
    return comments.map((val) => {
      return (
        <SmallComment
          content={val.content}
          profile_picture={val?.User?.profile_picture}
          user={val?.Comments?.User?.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchUserPost();
    fetchComments();
  }, []);

  return (
    <Center>
      <Flex>
        <Box
          backgroundColor="black"
          color="white"
          borderWidth="1px"
          borderRadius="lg"
          maxW="lg"
          paddingY="2"
          marginY="4"
        >
          <Box paddingX="3" display="flex" alignItems="center" marginBottom={1}>
            {/* <Link href={`/profile/${userId}`}> */}
            <Avatar src={userPost?.post_user?.profile_picture} size="md" />
            {/* </Link> */}
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              marginLeft={2}
            >
              <Box display="flex" alignItems="center">
                <Text>{userPost?.post_user?.username}</Text>{" "}
                <Icon boxSize={3.5} as={GoVerified} marginLeft={1} />
              </Box>
              <Box display="flex" alignItems="center">
                <Icon boxSize={3} as={HiLocationMarker} marginRight="1" />
                <Text fontSize="xs">{userPost?.location}</Text>
              </Box>
            </Box>
          </Box>
          {/* <Link href={`/posts/${id}`}> */}
          <Image padding={2} src={userPost?.image_url} minW={510} />
          {/* </Link> */}
          <Box paddingX="3">
            <Text fontWeight="bold">
              {userPost?.number_of_likes?.toLocaleString()} People approve this.
            </Text>
            <Text>
              <span className="fw-bold">{userPost?.User?.username}</span>{" "}
              <span>
                {userPost?.caption?.length > 140
                  ? userPost?.caption?.slice(0, 140) + "..."
                  : userPost?.caption}
              </span>
            </Text>

            <Box display="flex" marginTop={4} paddingBottom={2}>
              <Icon boxSize={6} as={HiOutlineEmojiHappy}></Icon>
              <Icon boxSize={6} as={RiSkull2Line} marginLeft={2}></Icon>
            </Box>
          </Box>
        </Box>

        <Box
          backgroundColor="black"
          color="white"
          borderWidth="1px"
          borderRadius="lg"
          maxW="lg"
          paddingY="2"
          marginY="4"
        >
          <Text mb={6} padding={5}>
            Comment Section
          </Text>
          {renderComments()}
        </Box>
      </Flex>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_token;

  return {
    props: {
      user: userData,
    },
  };
});

export default Post;

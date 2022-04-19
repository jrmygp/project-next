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
import SmallComment from "../../component/CommentSmall";
import { useRouter } from "next/router";
import axiosInstance from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";

const Post = () => {
  const [userPost, setUserPost] = useState({});
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();

  const fetchUserPost = async () => {
    try {
      const postData = await axiosInstance.get(`/posts`, {
        params: {
          id: router.query.post,
        },
      });

      setUserPost(postData.data.result.rows[0]);
      console.log(postData.data.result.rows[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchComments = async () => {
    try {
      const commentData = await axiosInstance.get(`/comments`, {
        params: {
          post_id: router.query.post,
          _limit: 3,
          _page: page,
        },
      });
      // console.log(commentData)
      setComments([...comments, ...commentData.data.result.rows]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextComments = () => {
    setPage(page + 1)
  }

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
  }, [page]);

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
                {userPost?.post_user?.is_verified == true ? (
                  <Icon boxSize={3.5} as={GoVerified} marginLeft={1} />
                ) : null}
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
              {userPost?.like_count?.toLocaleString()} People approve this.
            </Text>
            <Flex>
              <Text fontWeight="bold" mr={2}>
                {userPost?.post_user?.username}
              </Text>
              <span>
                {userPost?.caption?.length > 140
                  ? userPost?.caption?.slice(0, 140) + "..."
                  : userPost?.caption}
              </span>
            </Flex>
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
          maxH="500px"
          overflow="scroll"
        >
          <Text mb={6} padding={5}>
            Comment Section
          </Text>
          {renderComments()}
          <Button ml={2} colorScheme="green" size="xs" onClick={() => fetchNextComments()}>See more comments</Button>
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

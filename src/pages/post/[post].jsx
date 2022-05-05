import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Icon,
  Flex,
  Image,
  Text,
  Avatar,
  Button,
  Center,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import SmallComment from "../../component/CommentSmall";
import { useRouter } from "next/router";
import axiosInstance from "../../configs/api";
import Link from "next/link";
import requiresAuth from "../../component/requiresAuth";
import Page from "../../component/Page";
import { WEB_URL } from "../../configs/url";
import axios from "axios";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { BiCopy } from "react-icons/bi";

const Post = ({ postDetailData }) => {
  const userSelector = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState({});
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [commentData, setCommentData] = useState([]);
  const toast = useToast();
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
      setCommentData(commentData.data.result.rows);
      setComments([...comments, ...commentData.data.result.rows]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextComments = () => {
    setPage(page + 1);
  };

  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(
      `https://pretty-bear-52.loca.lt${router.asPath}`
    );

    toast({
      position: "top-right",
      status: "info",
      title: "Link copied",
    });
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
  }, [page]);

  return (
    <Page
      title={`${postDetailData?.post_user?.username} just posted this`}
      description={postDetailData?.caption}
      image={postDetailData?.image_url}
      url={`${WEB_URL}${router.asPath}`}
    >
      <Center>
        <Flex>
          <Box
            backgroundColor="black"
            color="white"
            borderTopLeftRadius="lg"
            borderBottomLeftRadius="lg"
            maxW="lg"
            paddingY="2"
            marginY="4"
          >
            <Box
              paddingX="3"
              display="flex"
              alignItems="center"
              marginBottom={1}
            >
              <Avatar
                src={postDetailData?.post_user?.profile_picture}
                size="md"
              />
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                marginLeft={2}
              >
                <Box display="flex" alignItems="center">
                  <Text>{postDetailData?.post_user?.username}</Text>{" "}
                  {postDetailData?.post_user?.is_verified == true ? (
                    <Icon boxSize={3.5} as={GoVerified} marginLeft={1} />
                  ) : null}
                </Box>
                <Box display="flex" alignItems="center">
                  <Icon boxSize={3} as={HiLocationMarker} marginRight="1" />
                  <Text fontSize="xs">{postDetailData?.location}</Text>
                </Box>
              </Box>
            </Box>
            <Image
              padding={2}
              src={postDetailData?.image_url}
              minW={510}
              maxH="500px"
            />
            <Box display="flex" alignItems="center" ml={2} mb={2} mt={2}>
              <FacebookShareButton
               url={`${WEB_URL}${router.asPath}`}
               quote={`Check this out ${postDetailData?.caption}!`}>
                <FacebookIcon size={25} round />
              </FacebookShareButton>
              <TwitterShareButton
                title={`Check this out ${postDetailData?.caption}!`}
                url={`${WEB_URL}${router.asPath}`}>
                <TwitterIcon size={25} round />
              </TwitterShareButton>
              <WhatsappShareButton
               url={`${WEB_URL}${router.asPath}`}
               title={`Check this out ${postDetailData?.caption}!`}
               >
                <WhatsappIcon size={25} round />
              </WhatsappShareButton>
              <IconButton
                onClick={copyLinkBtnHandler}
                borderRadius="50%"
                size="xs"
                backgroundColor="black"
                border="1px solid white"
                icon={<Icon as={BiCopy} />}
              />
            </Box>
            <Box paddingX="3">
              <Text fontWeight="bold">
                {postDetailData?.like_count?.toLocaleString()} People approve
                this.
              </Text>
              <Flex>
                <Text fontWeight="bold" mr={2}>
                  {postDetailData?.post_user?.username}
                </Text>
                <span>
                  {postDetailData?.caption?.length > 140
                    ? postDetailData?.caption?.slice(0, 140) + "..."
                    : postDetailData?.caption}
                </span>
              </Flex>
            </Box>
          </Box>

          <Box
            backgroundColor="black"
            color="white"
            borderTopRightRadius="lg"
            borderBottomRightRadius="lg"
            maxW="lg"
            paddingY="2"
            marginY="4"
            maxH="700px"
            overflow="scroll"
          >
            <Text mb={6} padding={5}>
              Comment Section
            </Text>
            {renderComments()}
            {commentData.length ? (
              <Button
                ml={2}
                bgColor="white"
                color="black"
                size="xs"
                onClick={() => fetchNextComments()}
              >
                See more comments
              </Button>
            ) : null}
          </Box>
        </Flex>
      </Center>
    </Page>
  );
};

export const getServerSideProps = async (context) => {
  // Dapetin route params
  // Fetch user profile based on ID dari route params
  // passing data lewat props

  try {
    const id = context.query.post;

    const res = await axios.get(`http://localhost:2000/posts/get-one-post`, {
      params: {
        id,
      },
    });

    return {
      props: {
        postDetailData: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        postDetailData: null,
      },
    };
  }
};

export default Post;

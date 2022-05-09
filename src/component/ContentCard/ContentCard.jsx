import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Image,
  Button,
  Icon,
  Input,
  Flex,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import { IoIosPaperPlane, IoCopy } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import Comment from "../Comment-Section/Comment";
import Link from "next/link";
import axiosInstance from "../../configs/api";
import { useSelector } from "react-redux";
import { WEB_URL } from "../../configs/url";
import { useRouter } from "next/router";
import Page from "../Page";
import { useFormik } from "formik";
import * as yup from "yup";

const ContentCard = ({
  username,
  location,
  caption,
  numberOfLikes,
  imageUrl,
  id,
  profile_picture,
  userId,
  addLike,
  disLike,
  likeStatus,
  date,
  verified,
}) => {
  const [comments, setComments] = useState([]);
  const [like_status, setlike_status] = useState(likeStatus);
  const userSelector = useSelector((state) => state.user);
  const [displayComment, setDisplayComment] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: yup.object().shape({
      comment: yup.string().max(200, "Maximum 200 characters per comment!"),
    }),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      const newComment = {
        user_id: userSelector.id,
        content: values.comment,
        post_id: id,
      };
      await axiosInstance.post("/comments", newComment);
      fetchComments();
      setDisplayComment(displayComment);
      resetForm({ values: "" });
    },
  });
  const fetchComments = async () => {
    try {
      const dataResult = await axiosInstance.get(`/comments`, {
        params: {
          post_id: id,
          _limit: 5,
        },
      });
      setComments(dataResult.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const renderComments = () => {
    return comments.map((val) => {
      return <Comment content={val?.content} username={val?.User?.username} />;
    });
  };

  const handleCommentInput = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(`https://proud-lizard-0.loca.lt/post/${id}`);

    toast({
      position: "top-right",
      status: "info",
      title: "Link copied",
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Page
      title={`${username} just posted this`}
      description={caption}
      image={imageUrl}
      url={`${WEB_URL}${router.asPath}`}
    >
      <Box
        backgroundColor="black"
        color="white"
        borderRadius="lg"
        maxW="lg"
        paddingY="2"
        marginY="4"
        boxShadow="0 4px 10px 0 #34495E"
      >
        <Box paddingX="3" display="flex" alignItems="center" marginBottom={1}>
          <Link
            href={
              userSelector.id == userId ? `/my-profile` : `/profile/${userId}`
            }
          >
            <Avatar
              src={profile_picture}
              size="md"
              sx={{ _hover: { cursor: "pointer" } }}
            />
          </Link>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            marginLeft={2}
          >
            <Box display="flex" alignItems="center">
              <Text>{username}</Text>{" "}
              {verified == true ? (
                <Icon
                  boxSize={3.5}
                  as={GoVerified}
                  marginLeft={1}
                  color="#1DA1F2"
                />
              ) : null}
            </Box>
            <Box display="flex" alignItems="center">
              <Icon boxSize={3} as={HiLocationMarker} marginRight="1" />
              <Text fontSize="xs">{location}</Text>
            </Box>
          </Box>
        </Box>
        <Link href={`/post/${id}`}>
          <Image
            padding={2}
            src={imageUrl}
            minW={510}
            maxH={500}
            sx={{ _hover: { cursor: "pointer" } }}
          />
        </Link>
        <Box paddingX="3">
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">
              {numberOfLikes.toLocaleString()} People approve this.
            </Text>
            <Text fontWeight="bold" fontSize="xs">
              Posted at {date}
            </Text>
          </Flex>
          <Text>
            <span className="fw-bold">{username} </span>{" "}
            <span>
              {caption.length > 140 ? caption.slice(0, 140) + "..." : caption}
            </span>
          </Text>
          <Flex
            marginTop={4}
            borderBottom="1px"
            paddingBottom={2}
            justifyContent="space-between"
            alignItems="center"
          >
            {like_status ? (
              <Icon
                onClick={() => {
                  disLike();
                  setlike_status(false);
                }}
                boxSize={6}
                as={HiOutlineEmojiHappy}
                sx={{ _hover: { cursor: "pointer" } }}
                color="pink.500"
              ></Icon>
            ) : (
              <Icon
                onClick={() => {
                  addLike();
                  setlike_status(true);
                }}
                boxSize={6}
                as={HiOutlineEmojiHappy}
                sx={{ _hover: { cursor: "pointer" } }}
              ></Icon>
            )}
            <Box display="flex" alignItems="center">
              <FacebookShareButton
                url={`${WEB_URL}/posts/${id}`}
                quote={`${username} just posted ${caption}! check it out at:`}
              >
                <FacebookIcon size={25} round />
              </FacebookShareButton>
              <TwitterShareButton
                title={`${username} just posted ${caption}! check it out at:`}
                url={`${WEB_URL}/posts/${id}`}
              >
                <TwitterIcon size={25} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`${WEB_URL}/posts/${id}`}
                title={`${username} just posted ${caption}! check it out at:`}
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
          </Flex>
        </Box>
        <Box marginTop={4} padding={3} display="flex" alignItems="center">
          <Input
            onChange={handleCommentInput}
            type="text"
            placeholder="Insert your comment here"
            name="comment"
          />
          <Icon
            boxSize={6}
            as={IoIosPaperPlane}
            onClick={formik.handleSubmit}
            marginLeft="5"
            marginRight="5"
            sx={{ _hover: { cursor: "pointer" } }}
          />
        </Box>
        {displayComment ? renderComments() : null}

        <Button
          onClick={() => setDisplayComment(!displayComment)}
          size="xs"
          backgroundColor="black"
          marginLeft={2}
        >
          {!displayComment ? "See Comments" : "Hide Comments"}
        </Button>
      </Box>
    </Page>
  );
};
export default ContentCard;

import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Image,
  Button,
  Icon,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import { IoIosPaperPlane } from "react-icons/io";
import { RiSkull2Fill, RiSkull2Line } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import Comment from "../Comment-Section/Comment";
import Link from "next/link";
import  axiosInstance  from "../../configs/api";
import { useSelector } from "react-redux";
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
  disLike
}) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const userSelector = useSelector((state) => state.user);

  const [displayComment, setDisplayComment] = useState(false);

  const fetchComments = async () => {
    try {
      const dataResult = await axiosInstance.get(`/comments`, {
        params: {
          post_id: id,
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
    const { value } = event.target;

    setCommentInput(value);
  };

  const postNewComment = async () => {
    try {
      const newData = {
        user_id: userSelector.id,
        content: commentInput,
        post_id: id,
      };
      const result = await axiosInstance.post("/comments", newData);
      fetchComments();
      setDisplayComment(!displayComment);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
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
            <Icon boxSize={3.5} as={GoVerified} marginLeft={1} />
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
        <Text fontWeight="bold">
          {numberOfLikes.toLocaleString()} People approve this.
        </Text>
        <Text>
          <span className="fw-bold">{username} </span>{" "}
          <span>
            {caption.length > 140 ? caption.slice(0, 140) + "..." : caption}
          </span>
        </Text>
        <Box display="flex" marginTop={4} borderBottom="1px" paddingBottom={2}>
          <Icon 
          onClick={addLike}
          boxSize={6} as={HiOutlineEmojiHappy}  sx={{ _hover: { cursor: "pointer" } }}></Icon>
          <Icon boxSize={6} as={RiSkull2Line} marginLeft={2}></Icon>
        </Box>
      </Box>
      <Box marginTop={4} padding={3} display="flex" alignItems="center">
        <Input
          onChange={handleCommentInput}
          type="text"
          placeholder="Insert flame comment here!"
        />
        <Icon
          boxSize={6}
          as={IoIosPaperPlane}
          onClick={postNewComment}
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
  );
};
export default ContentCard;

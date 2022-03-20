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
import { axiosInstance } from "../../configs/api";
import { useSelector } from "react-redux";

const ContentCard = ({
  username,
  location,
  caption,
  numberOfLikes,
  imageUrl,
  id,
  profile_picture,
  userId,
}) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const userSelector = useSelector((state) => state.user)

  const [displayComment, setDisplayComment] = useState(false);

  const fetchComments = async () => {
    await axiosInstance
      .get(`/comments`, {
        params: {
          postId: id,
          _expand: "user",
        },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err)
        alert("Terjadi kesalahan pada server")
      })
  };

  const renderComments = () => {
    return comments.map((val) => {
      return <Comment content={val.content} username={val?.user?.username} />;
    });
  };

  const handleCommentInput = (event) => {
    const { value } = event.target;

    setCommentInput(value);
  };

  const postNewComment = () => {
    const newData = {
      userId: userSelector.id,
      content: commentInput,
      postId: id,
    };

    axios.post(`http://localhost:2000/comments`, newData).then(() => {
      fetchComments();
      setDisplayCommentInput(false);
    });
  };

  useEffect (() => {
    fetchComments()
  },[])

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
        <Link href={`/profile/${userId}`}>
          <Avatar src={profile_picture} size="md" sx={{ _hover: { cursor: "pointer" } }}/>
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
        <Image padding={2} src={imageUrl} sx={{ _hover: { cursor: "pointer" } }}/>
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
          <Icon boxSize={6} as={HiOutlineEmojiHappy}></Icon>
          <Icon boxSize={6} as={RiSkull2Line} marginLeft={2}></Icon>
        </Box>
      </Box>
      {/* 
      {displayCommentInput ? ( */}
      <Box marginTop={4} padding={3} display="flex" alignItems="center">
        <Input
          onChange={handleCommentInput}
          onClick={() => setDisplayCommentInput(true)}
          type="text"
          placeholder="Insert flame comment here!"
        />
        <Icon
          boxSize={6}
          as={IoIosPaperPlane}
          onClick={postNewComment}
          marginLeft="5"
          marginRight="5"
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

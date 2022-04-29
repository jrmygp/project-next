import { Box, Center, Text, Avatar, Image, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axiosInstance from "../../configs/api";

const LikedPost = () => {
  const router = useRouter();
  const [likedPost, setLikedPost] = useState([]);
  const fetchLikedPost = async () => {
    try {
      const post = await axiosInstance.get(`/posts/get-liked-post`, {
        params: {
          user_id: router.query.liked,
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });
      console.log(post);
      setLikedPost(post.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      fetchLikedPost();
    }
  }, [router.isReady]);

  const renderLikedPost = () => {
    return likedPost.map((val) => {
      return (
        <Link href={`/post/${val?.post_like?.id}`}>
        <Image
          src={val?.post_like?.image_url}
          boxSize="290px"
          objectFit="cover"
          margin="5px"
          border="1px solid white"
          sx={{ _hover: { cursor: "pointer" } }}
        />
        </Link>
      );
    });
  };
  return (
    <Center mt={5}>
      <Flex borderRadius={5} flexWrap="wrap" ml={20}>
        {renderLikedPost()}
      </Flex>
    </Center>
  );
};

export default LikedPost;

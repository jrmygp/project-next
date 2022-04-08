import { useState, useEffect } from "react";
import ContentCard from "../../component/ContentCard/ContentCard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Box, Center } from "@chakra-ui/react";
import requiresAuth from "../../component/requiresAuth";
import  axiosInstance  from "../../configs/api";
import { useSelector } from "react-redux";

function HomePage() {
  const [contentList, setContentList] = useState([]);
  const userSelector = useSelector((state) => state.user);

  const fetchContentList = async () => {
    try {
      const postData = await axiosInstance.get("/posts", {
        params: {
          _sortBy : "id",
          _sortDir : "DESC"
        }
      });
      console.log(postData.data.result.rows)
      setContentList(postData.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  // add like
  const addLike = async (postId, idx) => {
    try {
      await axiosInstance.post(`/posts/${postId}/likes/${userSelector.id}`)

      const newData = [...contentList]

      newData[idx].like_count++

      setContentList(newData)
    } catch (err) {
      console.log(err)
    }
  }

  
  // dislike
  const disLike = async (postId, idx) => {
    try {
      await axiosInstance.delete(`/posts/${postId}/likes/${userSelector.id}`)

      const newData = [...contentList]

      newData[idx].like_count--

      setContentList(newData)
    } catch (err) {
      console.log(err)
    }
  }


  const renderContentList = () => {
    return contentList.map((val, idx) => {
      let likeStatus
      if (val?.user_like?.length){
        likeStatus = true 
      } else {
        likeStatus = false
      }
      return (
        <ContentCard
          username={val?.post_user?.username}
          caption={val.caption}
          imageUrl={val.image_url}
          location={val.location}
          numberOfLikes={val.like_count}
          id={val.id}
          profile_picture={val?.post_user?.profile_picture}
          userId={val?.user_id}
          likeStatus={likeStatus}
          addLike={()=>addLike(val.id, idx)}
          disLike={()=>disLike(val.id, idx)}
        />
      );
    });
  };

  useEffect(() => {
    fetchContentList();
  }, []);

  return (
    <Center>
      <Box paddingY="1" marginLeft={20}>
        {renderContentList()}
      </Box>
    </Center>
  );
}

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default HomePage;

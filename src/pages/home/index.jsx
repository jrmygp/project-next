import { useState, useEffect } from "react";
import ContentCard from "../../component/ContentCard/ContentCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Center, Spinner } from "@chakra-ui/react";
import requiresAuth from "../../component/requiresAuth";
import  axiosInstance  from "../../configs/api";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

function HomePage() {
  const [contentList, setContentList] = useState([]);
  const userSelector = useSelector((state) => state.user);
  const [page, setPage] = useState(1)

  const fetchContentList = async () => {
    try {
      const postData = await axiosInstance.get("/posts", {
        params: {
          _sortBy : "id",
          _sortDir : "DESC",
          _limit : 3,
          _page : page
        }
      });
      setContentList((prevPost) => [...prevPost, ...postData.data.result.rows]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextPage = () => {
    setPage(page + 1)
  }

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
    return contentList?.map((val, idx) => {
      console.log(val)
      let likeStatus
      let isLiked = val?.user_like
      if (isLiked?.length){
        likeStatus = true 
      } else {
        likeStatus = false
      }

    // return contentList.map((val, idx) => {

    // })
   
  
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
          date={val.createdAt}
          verified={val?.post_user?.is_verified}
        />
      );
    });
  };

  useEffect(() => {
    fetchContentList();
  }, [page]);

  return (
    <Center>
      <InfiniteScroll
      dataLength={contentList.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<Spinner />}
      >

      <Box paddingY="1" marginLeft={20}>
        {renderContentList()}
      </Box>
      </InfiniteScroll>
    </Center>
  );
}

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default HomePage;

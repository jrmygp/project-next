import { useState, useEffect } from "react";
import ContentCard from "../../component/ContentCard/ContentCard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Box, Center } from "@chakra-ui/react";
import requiresAuth from "../../component/requiresAuth";
import { axiosInstance } from "../../configs/api";

function HomePage() {
  const [contentList, setContentList] = useState([]);
  const [userData, setUserData] = useState({});

  const fetchContentList = async () => {
    // axios
    //   .get("http://localhost:2000/posts", { params: { _expand: "user", _sort: "id", _order: "desc" } })
    const res = await axiosInstance
      .get("/post", {
        params: { _expand: "user", _sort: "id", _order: "desc" },
      })

  };

  const renderContentList = () => {
    return contentList.map((val) => {
      return (
        <ContentCard
          username={val?.user?.username}
          caption={val.caption}
          imageUrl={val.image_url}
          location={val.location}
          numberOfLikes={val.number_of_likes}
          id={val.id}
          profile_picture={val?.user?.profile_picture}
          userId={val?.userId}
        />
      );
    });
  };

  // componentDidMount
  useEffect(() => {
    fetchContentList();
    // fetchUserData()
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

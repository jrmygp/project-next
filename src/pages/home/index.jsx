import { useState, useEffect } from "react";
import ContentCard from "../../component/ContentCard/ContentCard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Box, Center } from "@chakra-ui/react";

function HomePage() {
  const [contentList, setContentList] = useState([]);
  const [userData, setUserData] = useState({})

  const fetchContentList = () => {
    axios
      .get("http://localhost:2000/posts", { params: { _expand: "user" } })
      .then((res) => {
        setContentList(res.data);
      });
  };

  const renderContentList = () => {
    return contentList.map((val) => {
      return (
        <ContentCard
          username={val.user.username}
          caption={val.caption}
          imageUrl={val.image_url}
          location={val.location}
          numberOfLikes={val.number_of_likes}
          id={val.id}
          profile_picture = {val?.user?.profile_picture}
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

export default HomePage;

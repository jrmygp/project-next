import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import { Box, Text, Avatar, Icon, Center, Image, Flex, } from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { MdOutlinePhotoCamera } from "react-icons/md"
import { useSelector } from "react-redux";
import { axiosInstance } from "../../configs/api";


const MyProfilePage = () => { 
  const userSelector = useSelector( (state) => state.user)
  const [userPost, setUserPost] = useState([]);


  const fetchUserPosts = () => {
    axios
      .get(`http://localhost:2000/posts`, {
        params: {
          userId: userSelector.id
        }
      })
      .then((res) => {
        setUserPost(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  useEffect(() => {
    fetchUserPosts()
  }, []);

  const renderPost = () => {
    return userPost.map((val) => {
      return (
      <Image 
      src={val.image_url}
      boxSize="230px"
      />
      );
    });
  };
  return (
    <Center>
      <Box
        w="95vh"
        h="95vh"
        backgroundColor="black"
        marginLeft={5}
        marginTop={5}
        borderRadius="lg"
        border="1px solid white"
      >
        <Box
          paddingTop={5}
          paddingLeft={5}
          paddingBottom={5}
          margin={2}
          color="white"
          display="flex"
          alignItems="center"
          borderRadius="lg"
          backgroundColor="black"
        >
          <Avatar
            src={userSelector.profile_picture}
            size="xl"
          />

          <Box
            display="flex"
            flexDirection="column"
            marginLeft={50}
            fontSize="3xl"
            backgroundColor="black"
          >
            <Box display="flex" alignItems="center" backgroundColor="black">
              <Text backgroundColor="black">{userSelector.username}</Text>
              <Icon as={GoVerified} ml={2} boxSize={4} />
            </Box>
            <Text fontSize="lg" backgroundColor="black">{userSelector.usertag}</Text>
            <Box display="flex" fontSize="sm" marginTop={5} backgroundColor="black">
              <Text marginRight={2} backgroundColor="black">0 Post</Text>
              <Text marginRight={2} backgroundColor="black">0 Followers</Text>
              <Text marginRight={2} backgroundColor="black">0 Ratings</Text>
            </Box>
          </Box>
        </Box>
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        paddingTop={2}
        backgroundColor="black"
        borderTop="1px solid white">
            <Icon as={ MdOutlinePhotoCamera }/>
            <Text marginLeft={2}/>POSTS
        </Box>
        <Flex padding={8} justifyContent="space-between" borderRadius={5} backgroundColor="black">
          {renderPost()}
        </Flex>
      </Box>
    </Center>
  );
};

export default MyProfilePage;

import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const UploadPage = () => {
    const userSelector = useSelector((state) => state.user)
    const [urlInput, setUrlInput] = useState("")
    const [captionInput, setCaptionInput] = useState("")
    const [locationInput, setLocationInput] = useState("")

    const handleUrlInput = (event) => {
        const { value } = event.target
        setUrlInput(value)
    }

    const handleCaptionInput = (event) => {
        const { value } = event.target
        setCaptionInput(value)
    }

    const handleLocationInput = (event) => {
        const { value } = event.target
        setLocationInput(value)
    }

    const postNewPost = () => {
        const newPost = {
            userId: userSelector.id,
            location: locationInput,
            caption: captionInput,
            image_url: urlInput,
            number_of_likes: 0
        }

        axios.post(`http://localhost:2000/posts`, newPost)
    }
  return (
    <Center>
      <Box
        w="50vh"
        h="50vh"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Input w="50vh" marginBottom="10px" placeholder="upload your link image here" onChange={handleUrlInput}/>
        <Input w="50vh" marginBottom="10px" placeholder="write your caption here" onChange={handleCaptionInput}/>
        <Input w="50vh" marginBottom="10px" placeholder="write your location here" onChange={handleLocationInput}/>
        <Button color="black" onClick={postNewPost}>Upload</Button>
      </Box>
    </Center>
  );
};

export default UploadPage;

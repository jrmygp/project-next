import {
  Box,
  Button,
  Center,
  Input,
  Text,
  useToast,
  Icon,
  InputGroup,
  InputRightElement,
  Avatar,
  Image,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import requiresAuth from "../../component/requiresAuth";
import { BsFillCheckCircleFill, BsImageFill } from "react-icons/bs";
import Link from "next/link";
import { useRef } from "react";
import  axiosInstance  from "../../configs/api";

const UploadPage = () => {
  const userSelector = useSelector((state) => state.user);
  const [urlInput, setUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [preview, setPreview] = useState(false);
  const toast = useToast();
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };


  const uploadContentHandler = async () => {
    const formData = new FormData();

    formData.append("caption", captionInput);
    formData.append("location", locationInput);
    formData.append("user_id", userSelector.id);
    formData.append("post_image_file", selectedFile);

    try {
      await axiosInstance.post("/posts", formData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUrlInput = (event) => {
    const { value } = event.target;
    setUrlInput(value);
  };

  const handleCaptionInput = (event) => {
    const { value } = event.target;
    setCaptionInput(value);
  };

  const handleLocationInput = (event) => {
    const { value } = event.target;
    setLocationInput(value);
  };

  const postNewPost = () => {
    const newPost = {
      userId: userSelector.id,
      location: locationInput,
      caption: captionInput,
      image_url: urlInput,
      number_of_likes: 0,
    };

    axios.post(`http://localhost:2000/posts`, newPost);

    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} bg="green.500" borderRadius={5}>
          Upload successful <Icon bg="green.500" as={BsFillCheckCircleFill} />
        </Box>
      ),
    });
  };

  return (
    <Center>
      <Stack>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          color="white"
          border="1px solid white"
          mt={10}
          maxW="lg"
          p="10px"
          borderRadius={8}
          background="black"
        >
            <Input
              // w="50vh"
              marginBottom="10px"
              placeholder="upload your link image here"
              onChange={handleFile}
              ref={inputFileRef}
              type="file"
              display="none"
            />
            <Button
              onClick={() => inputFileRef.current.click()}
              colorScheme="green"
              mb="10px"
              maxW="500px"
              
            >
              Upload Image
            </Button>
          
          <Input
            // w="50vh"
            marginBottom="10px"
            placeholder="write your caption here"
            onChange={handleCaptionInput}
          />
          <Input
            // w="50vh"
            marginBottom="10px"
            placeholder="write your location here"
            onChange={handleLocationInput}
          />
          <Box p="5px">
            <Link href="/home">
              <Button
                color="black"
                onClick={uploadContentHandler}
                maxW="xs"
                mt={3}
                mr={5}
              >
                Upload
              </Button>
            </Link>
            <Button
              color="black"
              maxW="xs"
              mt={3}
              onClick={() => setPreview(!preview)}
            >
              Preview
            </Button>
          </Box>
        </Box>
        {/* Post Preview */}
        {preview ? (
          <Box
            backgroundColor="black"
            color="white"
            borderWidth="1px"
            borderRadius="lg"
            maxW="lg"
            paddingY="2"
            marginY="4"
          >
            <Box
              paddingX="3"
              display="flex"
              alignItems="center"
              marginBottom={1}
            >
              <Avatar size="md" src={userSelector.profile_picture} />
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                marginLeft={2}
              >
                <Box display="flex" alignItems="center">
                  <Text fontWeight="bold">{userSelector.username}</Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <Text fontSize="xs">{locationInput}</Text>
                </Box>
              </Box>
            </Box>
            <Image padding={2} minW={510} src={
              URL.createObjectURL
              (selectedFile)
              } />
            <Box paddingX="3">
              <Text fontWeight="bold">
                {(69420).toLocaleString()} People approve this.
              </Text>
              <Text>
                <span className="fw-bold">{userSelector.username}</span>{" "}
                <span>{captionInput}</span>
              </Text>
            </Box>
          </Box>
        ) : null}
      </Stack>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default UploadPage;

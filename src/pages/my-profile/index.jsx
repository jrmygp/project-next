import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  Avatar,
  Icon,
  Center,
  Image,
  Flex,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePhotoCamera, MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";
import { useRouter } from "next/router";
import { useFormik } from "formik"
import * as yup from "yup"
import Link from "next/link"
const MyProfilePage = ({ user, id }) => {
  const userSelector = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const router = useRouter();
  const [editPostId, setEditPostId] = useState(0)


  const formik = useFormik({
    initialValues: {
      location: "",
      image: "",
      caption: "",
    },
    validationSchema: yup.object().shape({
      location: yup.string().required("You must enter a specific location!"),
      image: yup.string().required("You must attach a proper image url!"),
      caption: yup.string().required("You must enter a caption for the post!")
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newPost = {
        location: values.location,
        image_url: values.image,
        caption: values.caption
      }
      await axiosInstance.patch(`/posts/${editPostId}`, newPost)
      formik.setSubmitting(false)
      onClose()
    }
  })

  const fetchUserPosts = () => {
    axios
      .get(`http://localhost:2000/posts`, {
        params: {
          userId: user.id,
        },
      })
      .then((res) => {
        setUserPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  const deletePost = async (postId) => {
    await axiosInstance.delete(`/posts/${postId}`);
    fetchUserPosts();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };
  useEffect(() => {
    fetchUserPosts();
  }, []);

  const openEditModal = (postId) => {
    onOpen()
    setEditPostId(postId)
  }

  const renderPost = () => {
    return userPost.map((val) => {
      return (
        <Box>
          <Link href={`/post/${id}`}>
          <Image
            src={val.image_url}
            boxSize="245px"
            marginTop="5px"
            marginRight="5px"
            marginBottom="5px"
            marginLeft="6px"
            objectFit="cover"
            border="1px solid white"
            sx={{ _hover: { cursor: "pointer" } }}
            />
            </Link>
          <Flex mb={2} paddingLeft={2}>
            <Icon
              as={RiDeleteBin6Line}
              color="gray.500"
              onClick={() => deletePost(val.id)}
              sx={{ _hover: { cursor: "pointer" } }}
              marginRight={5}
            />
            <Icon
              as={FaRegEdit}
              color="gray.500"
              onClick={() => openEditModal(val.id)}
              sx={{ _hover: { cursor: "pointer" } }}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent border="1px solid white" borderRadius={1}>
                <ModalHeader color="white">Edit this post</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody pb={6}>
                  <FormControl color="white" mb={3} isInvalid={formik.errors.location}>
                    <FormLabel>Location</FormLabel>
                    <Input placeholder="Input new location" name="location" onChange={inputHandler}/>
                    <FormHelperText>{formik.errors.location}</FormHelperText>
                  </FormControl>

                  <FormControl color="white" mb={3} isInvalid={formik.errors.image}>
                    <FormLabel>Image</FormLabel>
                    <Input placeholder="Input new image" name="image" onChange={inputHandler}/>
                    <FormHelperText>{formik.errors.image}</FormHelperText>
                  </FormControl>

                  <FormControl color="white" mb={3} isInvalid={formik.errors.caption}>
                    <FormLabel>Caption</FormLabel>
                    <Input placeholder="Input new caption" name="caption" onChange={inputHandler}/>
                    <FormHelperText>{formik.errors.caption}</FormHelperText>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="green" marginRight={5} onClick={formik.handleSubmit} type="submit">
                    Save
                  </Button>
                  <Button colorScheme="red" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
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
          <Avatar src={userSelector.profile_picture} size="xl" />

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
            <Text fontSize="lg" backgroundColor="black">
              {userSelector.usertag}
            </Text>
            <Box
              display="flex"
              fontSize="sm"
              marginTop={5}
              backgroundColor="black"
            >
              <Text marginRight={2} backgroundColor="black">
                0 Post
              </Text>
              <Text marginRight={2} backgroundColor="black">
                0 Followers
              </Text>
              <Text marginRight={2} backgroundColor="black">
                0 Ratings
              </Text>
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
          borderTop="1px solid white"
        >
          <Icon as={MdOutlinePhotoCamera} />
          <Text marginLeft={2} />
          POSTS
        </Box>
        <Flex
          borderRadius={5}
          backgroundColor="black"
          flexWrap="wrap"
          marginLeft={1}
        >
          {renderPost()}
        </Flex>
      </Box>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  let userData = context.req.cookies.user_data;

  userData = JSON.parse(userData);

  return {
    props: {
      user: userData,
      // id: postId
    },
  };
});

export default MyProfilePage;

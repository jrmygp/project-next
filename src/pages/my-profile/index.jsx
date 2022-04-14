import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { FiEdit2 } from "react-icons/fi";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useSelector } from "react-redux";
import axiosInstance from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useRef } from "react";

const MyProfilePage = ({ user }) => {
  const userSelector = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [editPostId, setEditPostId] = useState(0);
  const [deletePostId, setDeletePostId] = useState(0);
  const [postCount, setPostCount] = useState("");

  // Avatar file handler
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const uploadAvatarHandler = async () => {
    const formData = new FormData();

    formData.append("avatar_image_file", selectedFile);

    // console.log(formData);

    try {
      await axiosInstance.patch(`user/${userSelector.id}`, formData);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      location: "",
      caption: "",
    },
    validationSchema: yup.object().shape({
      location: yup.string().required("You must enter a specific location!"),
      caption: yup.string().required("You must enter a caption for the post!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newPost = {
        location: values.location,
        caption: values.caption,
      };
      await axiosInstance.patch(`/posts/${editPostId}`, newPost);
      formik.setSubmitting(false);
      setEditPostId(0);
    },
  });
  // EDIT USER DATA

  const userFormik = useFormik({
    initialValues: {
      username: `${userSelector.username}`,
      full_name: `${userSelector.full_name}`,
      bio: `${userSelector.bio}`,
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(8, "8 characters min")
        .max(16, "16 characters max"),
      full_name: yup.string().max(20, "20 characters max"),
      bio: yup.string().max(100, "100 characters max"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newUserData = {
        username: values.username,
        full_name: values.full_name,
        bio: values.bio,
      };
      await axiosInstance.patch(`/user/${userSelector.id}`, newUserData);
      userFormik.setSubmitting(false);
      onClose();
    },
  });
// console.log(userSelector)
  const inputUserHandler = (event) => {
    const { value, name } = event.target;
    userFormik.setFieldValue(name, value);
  };

  // EDIT USER DARA MODAL
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchUserPosts = async () => {
    try {
      const userData = await axiosInstance.get("/posts", {
        params: {
          user_id: userSelector.id,
          _sortBy: "id",
          _sortDir: "DESC",
        },
      });
      setUserPost(userData.data.result.rows);
      setPostCount(userData.data.result.count);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    await axiosInstance.delete(`/posts/${deletePostId}`);
    fetchUserPosts();
    setDeletePostId(0);
  };

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };
  useEffect(() => {
    if (userSelector.id) {
      fetchUserPosts();
    }
  }, [userSelector.id]);

  const openEditModal = (postId) => {
    setEditPostId(postId);
  };

  const openDeleteModal = (postId) => {
    setDeletePostId(postId);
  };

  const renderPost = () => {
    return userPost.map((val) => {
      return (
        <Box>
          <Link href={`/post/${val.id}`}>
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
              onClick={() => openDeleteModal(val.id)}
              sx={{ _hover: { cursor: "pointer" } }}
              marginRight={5}
            />
            <Modal
              isOpen={val.id == deletePostId}
              onClose={() => setDeletePostId(0)}
            >
              <ModalOverlay />
              <ModalContent border="1px solid white">
                <ModalHeader color="black">Delete Post</ModalHeader>
                <ModalCloseButton color="black" />
                <ModalBody pb={6}>
                  <Text>Are you sure to delete this post?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => setDeletePostId(0)}
                    mr={5}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={() => deletePost(val.id)}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Icon
              as={FaRegEdit}
              color="gray.500"
              onClick={() => openEditModal(val.id)}
              sx={{ _hover: { cursor: "pointer" } }}
            />
            <Modal
              isOpen={val.id == editPostId}
              onClose={() => setEditPostId(0)}
            >
              <ModalOverlay />
              <ModalContent border="1px solid white" borderRadius={3}>
                <ModalHeader color="black">Edit this post</ModalHeader>
                <ModalCloseButton color="black" />
                <ModalBody pb={6}>
                  <FormControl
                    color="black"
                    mb={3}
                    isInvalid={formik.errors.location}
                  >
                    <FormLabel>Location</FormLabel>
                    <Input
                      placeholder="Input new location"
                      name="location"
                      onChange={inputHandler}
                    />
                    <FormHelperText>{formik.errors.location}</FormHelperText>
                  </FormControl>
                  <FormControl
                    color="black"
                    mb={3}
                    isInvalid={formik.errors.caption}
                  >
                    <FormLabel>Caption</FormLabel>
                    <Input
                      placeholder="Input new caption"
                      name="caption"
                      onChange={inputHandler}
                    />
                    <FormHelperText>{formik.errors.caption}</FormHelperText>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="green"
                    marginRight={5}
                    onClick={formik.handleSubmit}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button colorScheme="red" onClick={() => setEditPostId(0)}>
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
          <Flex flexDir="column">
            <Avatar
              src={userSelector.profile_picture}
              size="xl"
              sx={{ _hover: { cursor: "pointer" } }}
              onClick={() => inputFileRef.current.click()}
            />
            {selectedFile ? (
              <Button
                colorScheme="blue"
                mt={2}
                size="xs"
                onClick={uploadAvatarHandler}
              >
                Save Avatar
              </Button>
            ) : null}
            <Input
              onChange={handleFile}
              ref={inputFileRef}
              type="file"
              display="none"
            />
          </Flex>
          <Flex>
            <Box
              display="flex"
              flexDirection="column"
              marginLeft={5}
              fontSize="3xl"
              backgroundColor="black"
            >
              <Box display="flex" alignItems="center" backgroundColor="black">
                <Text backgroundColor="black">{userSelector.username}</Text>
                <Icon as={GoVerified} ml={1} boxSize={4} />
              </Box>
              <Text fontSize="lg" backgroundColor="black" color="white">
                {userSelector.usertag}
              </Text>
              <Box
                display="flex"
                fontSize="sm"
                marginTop={5}
                backgroundColor="black"
              >
                <Text marginRight={2} backgroundColor="black">
                  {postCount} Post
                </Text>
                <Text marginRight={2} backgroundColor="black">
                  0 Followers
                </Text>
                <Text marginRight={2} backgroundColor="black">
                  0 Ratings
                </Text>
              </Box>
            </Box>

            <Box ml={5} mr={5} mt={2}>
              <Flex>
                <Text>{userSelector.bio}</Text>
                <Icon
                  as={FiEdit2}
                  onClick={onOpen}
                  sx={{ _hover: { cursor: "pointer" } }}
                  ml={2}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* EDIT USERNAME */}
                      <FormControl isInvalid={userFormik.errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input value={userFormik.values.username} name="username" onChange={inputUserHandler} />
                        <FormHelperText>
                          {userFormik.errors.username}
                        </FormHelperText>
                      </FormControl>
                      {/* EDIT FULL NAME */}
                      <FormControl isInvalid={userFormik.errors.full_name}>
                        <FormLabel>Full Name</FormLabel>
                        <Input value={userFormik.values.full_name} name="full_name" onChange={inputUserHandler} />
                        <FormHelperText>
                          {userFormik.errors.full_name}
                        </FormHelperText>
                      </FormControl>
                      <FormControl isInvalid={userFormik.errors.bio}>
                        <FormLabel>Bio</FormLabel>
                        <Input value={userFormik.values.bio} name="bio" onChange={inputUserHandler} />
                        <FormHelperText>{userFormik.errors.bio}</FormHelperText>
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      {/* <Link href="/ny-profile"> */}
                      <Button
                        colorScheme="green"
                        onClick={userFormik.handleSubmit}
                        mr={3}
                      >
                        Save
                      </Button>
                      {/* </Link> */}
                      <Button colorScheme="red" onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
            </Box>
          </Flex>
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
  const userData = context.req.cookies.user_token;

  return {
    props: {
      user: userData,
    },
  };
});

export default MyProfilePage;

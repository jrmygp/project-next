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
import { MdOutlinePhotoCamera, MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import  axiosInstance  from "../../configs/api";
import requiresAuth from "../../component/requiresAuth";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
const MyProfilePage = ({ user }) => {
  const userSelector = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const router = useRouter();
  const [editPostId, setEditPostId] = useState(0);

  const formik = useFormik({
    initialValues: {
      location: "",
      image: "",
      caption: "",
    },
    validationSchema: yup.object().shape({
      location: yup.string().required("You must enter a specific location!"),
      image: yup.string().required("You must attach a proper image url!"),
      caption: yup.string().required("You must enter a caption for the post!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newPost = {
        location: values.location,
        image_url: values.image,
        caption: values.caption,
      };
      await axiosInstance.patch(`/posts/${editPostId}`, newPost);
      formik.setSubmitting(false);
      onClose();
    },
  });

  const fetchUserPosts = async () => {
    try {
      const userData = await axiosInstance.get("/posts", {
        params: {
          user_id: userSelector.id,
          _sortBy: "id",
          _sortDir: "DESC"
        },
      });
      setUserPost(userData.data.result.rows)
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    await axiosInstance.delete(`/posts/${postId}`);
    fetchUserPosts();
    onCloseDelete()
  };

  // edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // delete modal
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };
  useEffect(() => {
    fetchUserPosts();
  }, []);

  const openEditModal = (postId) => {
    onOpen();
    setEditPostId(postId);
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
              onClick={onOpenDelete}
              sx={{ _hover: { cursor: "pointer" } }}
              marginRight={5}
            />
            <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
              <ModalOverlay />
              <ModalContent border="1px solid white">
                <ModalHeader color="black">Delete Post</ModalHeader>
                <ModalCloseButton color="black" />
                <ModalBody pb={6}>
                  <Text>Are you sure to delete this post?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onCloseDelete} mr={5} variant="outline">
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
            <Modal isOpen={isOpen} onClose={onClose}>
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
                    isInvalid={formik.errors.image}
                  >
                    <FormLabel>Image</FormLabel>
                    <Input
                      placeholder="Input new image"
                      name="image"
                      onChange={inputHandler}
                    />
                    <FormHelperText>{formik.errors.image}</FormHelperText>
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
          <Flex>
          <Avatar src={userSelector.profile_picture} size="xl" />

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

          <Box ml={5} mr={5} mt={2}>
            <Text>{userSelector.bio}</Text>
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

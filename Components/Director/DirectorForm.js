import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Drawer,
  useToast,
  FormLabel,
  DrawerBody,
  FormControl,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  FormHelperText,
  FormErrorMessage,
  DrawerCloseButton,
} from "@chakra-ui/react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const schema = {
  firstname: {
    isEmpty: false,
    min: 1,
    message: "Firstname is required",
  },
  lastname: {
    isEmpty: false,
    message: "Lastname is required",
  },
  position: {
    isEmpty: false,
    message: "Position is required",
  },
};

const DirectorForm = ({
  mode,
  open,
  reset,
  saved,
  exist,
  error,
  sending,
  message,
  confirm,
  checking,
  handleClose,
  initial_data,
  createDirector,
  updateDirector,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Director");
  const [formState, setFormState] = useState({
    values: {
      id: "",
      firstname: "",
      lastname: "",
      position: "",
      date_joined: "",
      story: "",
    },
    touched: {},
    errors: {},
  });

  const [uploadImage, setUploadImage] = useState({
    touched: false,
    preview: "",
    file: "choose file",
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Director");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id,
            date_joined: data && data.date_joined,
            firstname: data && data.firstname,
            lastname: data && data.lastname,
            position: data && data.position,
            story: data && data.story,
          },
        }));
      }
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          date_joined: "",
          firstname: "",
          lastname: "",
          position: "",
          story: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid:
        errors.firstname.error ||
        errors.lastname.error ||
        errors.position.error ||
        uploadImage.toggle === false
          ? false
          : true,
      errors: errors || {},
    }));
  }, [values]);

  useEffect(() => {
    if (saved === true) {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
      handleClose();
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      resetForm();
      handleClose();
    };
  }, [saved]);

  useEffect(() => {
    if (error === true) {
      toast({
        title: "Server Response.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      reset("error", false);
      reset("message", "");
      resetForm();
      handleClose();
    };
  }, [error]);

  const handleContentChange = (e) => {
    setFormState((state) => ({
      ...state,
      values: {
        ...state.values,
        story: e,
      },
      touched: {
        ...state.touched,
        story: true,
      },
    }));
  };
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
    if (
      (event.target.name === "firstname" ||
        event.target.name === "position" ||
        event.target.name === "lastname") &&
      formState.values.lastname !== "" &&
      formState.values.firstname !== "" &&
      formState.values.position !== ""
    ) {
      confirm(
        formState.values.lastname,
        formState.values.position,
        formState.values.firstname
      );
    }
  };
  const hasError = (field) => touched[field] && errors[field].error;

  // const readURI = (e) => {
  //   e.persist();
  //   let reader = new FileReader();
  //   let image = e.target.files[0];
  //   reader.onloadend = () => {
  //     setUploadImage((state) => ({
  //       ...state,
  //       touched: true,
  //       preview: reader.result,
  //       file: image,
  //     }));
  //   };
  //   reader.readAsDataURL(image);
  // };
  const readURI = (e) => {
    e.persist();
    let reader = new FileReader();
    if (e.target.files) {
      /* Get files in array form */
      const files = Array.from(e.target.files);
      // setUploadImage(files)
      reader.onloadend = () => {
        setUploadImage((state) => ({
          ...state,
          touched: true,
          preview: reader.result,
          file: files,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        date_joined: "",
        firstname: "",
        lastname: "",
        position: "",
        story: "",
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (var x = 0; x < uploadImage.file.length; x++) {
      fd.append("image", uploadImage.file[x]);
    }
    // fd.append("image", uploadImage.file);
    fd.append("firstname", formState.values.firstname);
    fd.append("lastname", formState.values.lastname);
    fd.append("date_joined", formState.values.date_joined);
    fd.append("position", formState.values.position);
    fd.append("story", formState.values.story);
    mode === "Add" ? createDirector(fd) : updateDirector(formState.values);
  };
  const firstField = React.useRef();

  return (
    <Fragment>
      <Drawer
        isOpen={open}
        placement="right"
        // initialFocusRef={firstField}
        onClose={handleClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("firstname") || exist}
                  >
                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                    <Input
                      type="text"
                      value={values.firstname || ""}
                      ref={firstField}
                      name="firstname"
                      id="firstname"
                      onChange={handleChange}
                      placeholder="Firstname"
                    />
                    <FormErrorMessage>
                      {hasError("firstname")
                        ? errors.firstname && errors.firstname.message
                        : null}
                    </FormErrorMessage>
                    <FormHelperText color={checking ? "blue" : "red"}>
                      {exist
                        ? message
                        : checking
                        ? "checking server for duplicate"
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("lastname") || exist}
                  >
                    <FormLabel htmlFor="lastname">Lastname</FormLabel>
                    <Input
                      type="text"
                      value={values.lastname || ""}
                      name="lastname"
                      id="lastname"
                      onChange={handleChange}
                      placeholder="Lastname"
                    />
                    <FormErrorMessage>
                      {hasError("lastname")
                        ? errors.lastname && errors.lastname.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("position") || exist}
                  >
                    <FormLabel htmlFor="position">Position</FormLabel>
                    <Input
                      type="text"
                      value={values.position || ""}
                      name="position"
                      id="position"
                      onChange={handleChange}
                      placeholder="Position"
                    />
                    <FormErrorMessage>
                      {hasError("position")
                        ? errors.position && errors.position.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="date_joined">Date Joined</FormLabel>
                    <Input
                      type="date"
                      value={values.date_joined || ""}
                      name="date_joined"
                      id="date_joined"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                {mode === "Add" ? (
                  <>
                    {" "}
                    <Box>
                      <FormControl my="3">
                        <FormLabel htmlFor="image">Image</FormLabel>
                        <Input
                          type="file"
                          accept="image/*"
                          name="image"
                          id="image"
                          onChange={readURI}
                        />

                        <FormHelperText color="red">
                          {uploadImage.touched ? null : "Image is important"}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                    <Box>
                      {uploadImage.touched ? (
                        <img
                          src={uploadImage.preview}
                          alt="First"
                          style={{ width: "100%", height: 90 }}
                        />
                      ) : null}
                    </Box>
                  </>
                ) : null}
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="story">Story</FormLabel>

                    <SunEditor
                      onChange={handleContentChange}
                      name="story"
                      setContents={formState.values.story}
                    />
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button
                variant="outline"
                disabled={sending}
                mr={3}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid || sending || exist}
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={sending}
                bg="brand.mainAccent"
                color="brand.white"
                variant="ghost"
                _hover={{
                  borderColor: "brand.mainAccent",
                  bg: "brand.white",
                  color: "brand.mainAccent",
                  boxShadow: "md",
                }}
                _focus={{}}
              >
                Save Director
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default DirectorForm;

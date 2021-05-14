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
  FormErrorMessage,
  DrawerCloseButton,
} from "@chakra-ui/react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const schema = {
  title: {
    isEmpty: false,
    min: 1,
    message: "Title is required",
  },
  description: {
    min: 5,
    message: "Description is required",
  },
};

const DocumentForm = ({
  mode,
  open,
  reset,
  saved, 
  error,
  sending,
  message, 
  handleClose,
  initial_data,
  createDocument,
  updateDocument,
}) => {
  const toast = useToast();
  const [pageTitle, setPageTitle] = useState("Add Document");
  const [formState, setFormState] = useState({
    values: { id: "", title: "", doc_type: "", description: "" },
    touched: {},
    errors: {},
  });
 
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setPageTitle("Edit Document");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id, 
            title: data && data.title,
            doc_type: data && data.doc_type,
            description: data && data.description,
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
          title: "",
          doc_type: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid:
        errors.title.error || 
        errors.description.error  
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
        description: e,
      },
      touched: {
        ...state.touched,
        description: true,
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
  };
  const hasError = (field) => touched[field] && errors[field].error;
  
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        title: "",
          doc_type: "",
          description: "",
      },
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createDocument(formState.values)
      : updateDocument(formState.values);
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
            <DrawerHeader borderBottomWidth="1px">{pageTitle}</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("title")}
                  >
                    <FormLabel htmlFor="title">Document Name</FormLabel>
                    <Input
                      type="text"
                      value={values.title || ""}
                      ref={firstField}
                      name="title"
                      id="title"
                      onChange={handleChange}
                      placeholder="title"
                    />
                    <FormErrorMessage>
                      {hasError("title")
                        ? errors.title && errors.title.message
                        : null}
                    </FormErrorMessage>
                   
                  </FormControl>
                </Box>
                <Box>
                  <FormControl 
                    my="3" 
                  >
                    <FormLabel htmlFor="doc_type">Document Type</FormLabel>
                    <Input
                      type="text"
                      value={values.doc_type || ""}
                      name="doc_type"
                      id="doc_type"
                      onChange={handleChange}
                      placeholder="doc_type"
                    /> 
                  </FormControl>
                </Box> 
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="description">description</FormLabel>

                    <SunEditor
                      onChange={handleContentChange}
                      name="description"
                      setContents={formState.values.description}
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
                Save Document
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default DocumentForm;

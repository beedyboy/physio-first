import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Drawer,
  useToast,
  Textarea,
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
const schema = {
  url_link: {
    isEmpty: false,
    min: 1,
    message: "A valid link is required",
  },
};
const MarketingForm = ({
  mode,
  open,
  reset,
  saved,
  error, 
  sending,
  message, 
  addLink,
  updateLink,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Marketing");
  const [formState, setFormState] = useState({
    values: { id: "", url_link: "", description: "" },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Marketing");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id,
            url_link: data && data.url_link,
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
          url_link: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.url_link.error   ? false : true,
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
    if (event.target.name === "name" && event.target.value.length >= 2) {
      confirm(event.target.value);
    }
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? addLink(formState.values)
      : updateLink(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        url_link: "",
        description: "",
      },
      touched: {},
      errors: {},
    }));
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
                  <FormControl isRequired my="3" isInvalid={hasError("url_link") }>
                    <FormLabel htmlFor="url_link">Url Link</FormLabel>
                    <Input
                      type="text"
                      value={values.url_link || ""}
                      ref={firstField}
                      name="url_link"
                      id="url_link"
                      onChange={handleChange}
                      placeholder="Marketing Url Link"
                    />
                    <FormErrorMessage>
                      {hasError("url_link")
                        ? errors.url_link && errors.url_link.message
                        : null}
                    
                    </FormErrorMessage>
                   
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="description">Description</FormLabel>

                    <Textarea
                      value={values.description || ""}
                      name="description"
                      id="description"
                      onChange={handleChange}
                      placeholder="Enter description"
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
                disabled={!isValid || sending }
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
                Save Marketing
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default MarketingForm;

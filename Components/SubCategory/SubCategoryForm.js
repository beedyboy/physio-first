import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Drawer,
  Select,
  useToast,
  Textarea,
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
const schema = {
  cat_id: {
    isEmpty: false,
    min: 1,
    message: "Category is required",
  },
  sub_name: {
    isEmpty: false,
    min: 1,
    message: "Name is required",
  },
};
const SubCategoryForm = ({
  mode,
  open,
  reset,
  saved,
  error,
  exist,
  confirm,
  sending,
  message,
  checking,
  addSubCat,
  categories,
  updateSubCat,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Sub-Category");
  const [formState, setFormState] = useState({
    values: { id: "", cat_id: "", sub_name: "", description: "" },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Sub-Category");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id,
            cat_id: data && data.cat_id,
            sub_name: data && data.sub_name,
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
          cat_id: "",
          sub_name: "",
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
        errors.sub_name.error || errors.cat_id.error || exist ? false : true,
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
    if (event.target.name === "sub_name" && values.cat_id !== "" && event.target.value.length >= 2) {
      confirm(values.cat_id, event.target.value);
    }
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? addSubCat(formState.values)
      : updateSubCat(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        cat_id: "",
        sub_name: "",
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
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("cat_id") || exist}
                  >
                    <FormLabel htmlFor="cat_id">Category</FormLabel>
                    <Select
                      value={values.cat_id || ""}
                      ref={firstField}
                      placeholder="Select option"
                      name="cat_id"
                      id="cat_id"
                      onChange={handleChange}
                    >
                      <option>Select One</option>
                      {categories &&
                        categories.map((val, index) => (
                          <option value={val._id}>{val.name}</option>
                        ))}
                    </Select>

                    <FormErrorMessage>
                      {hasError("cat_id")
                        ? errors.cat_id && errors.cat_id.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("sub_name") || exist}
                  >
                    <FormLabel htmlFor="sub_name">Sub-Category name</FormLabel>
                    <Input
                      type="text"
                      value={values.sub_name || ""} 
                      name="sub_name"
                      id="sub_name"
                      onChange={handleChange}
                      placeholder="Sub-Category name"
                    />
                    <FormErrorMessage>
                      {hasError("sub_name")
                        ? errors.sub_name && errors.sub_name.message
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
                Save SubCategory
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default SubCategoryForm;

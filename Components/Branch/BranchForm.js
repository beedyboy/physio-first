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
  name: {
    isEmpty: false,
    min: 1,
    message: "A valid branch name is required",
  },
  email: {
    isEmpty: false,
    message: "Email is required",
  },
  address: {
    min: 5,
    message: "Address is required",
  },
};
const BranchForm = ({
  mode,
  open,
  reset,
  saved,
  error,
  sending,
  message,
  createBranch,
  updateBranch,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Branch");
  const [formState, setFormState] = useState({
    values: { id: "", name: "", email: "", phone: "", address: "" },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Branch");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id,
            name: data && data.name,
            email: data && data.email,
            phone: data && data.phone,
            address: data && data.address,
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
          name: "",
          email: "",
          phone: "",
          address: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.name.error ? false : true,
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
    // if (event.target.name === "name" && event.target.value.length >= 2) {
    //   confirmName(event.target.value);
    // }
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createBranch(formState.values)
      : updateBranch(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
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
                  <FormControl isRequired my="3" isInvalid={hasError("name")}>
                    <FormLabel htmlFor="name">Branch name</FormLabel>
                    <Input
                      type="text"
                      value={values.name || ""}
                      ref={firstField}
                      name="name"
                      id="name"
                      onChange={handleChange}
                      placeholder="Branch name"
                    />
                    <FormErrorMessage>
                      {hasError("name")
                        ? errors.name && errors.name.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired my="3" isInvalid={hasError("email")}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      type="email"
                      value={values.email || ""}
                      name="email"
                      id="email"
                      onChange={handleChange}
                      placeholder="Email Address"
                    />
                    <FormErrorMessage>
                      {hasError("email")
                        ? errors.email && errors.email.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <Input
                      type="text"
                      value={values.phone || ""}
                      name="phone"
                      id="phone"
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("address")}
                  >
                    <FormLabel htmlFor="address">Address</FormLabel>

                    <Textarea
                      value={values.address || ""}
                      name="address"
                      id="address"
                      onChange={handleChange}
                      placeholder="Enter address"
                    />
                    <FormErrorMessage>
                      {hasError("address")
                        ? errors.address && errors.address.message
                        : null}
                    </FormErrorMessage>
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
                disabled={!isValid || sending}
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
                Save Branch
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default BranchForm;

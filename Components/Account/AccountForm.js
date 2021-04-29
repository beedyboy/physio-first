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
  firstname: {
    isEmpty: false,
    min: 1,
    message: "Firstname is required",
  },
  lastname: {
    isEmpty: false,
    min: 1,
    message: "Lastname is required",
  },
  staffId: {
    isEmpty: false,
    min: 1,
    message: "staffId is required",
  },
  email: {
    isEmpty: false,
    min: 5,
    message: "A valid email is required",
  },
  branch: {
    isEmpty: false,
    message: "User must belong to a branch",
  },
};
const AccountForm = ({
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
   addStaff,
  branches,
  updateStaff,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Staff");
  const [formState, setFormState] = useState({
    values: {
      id: "",
      firstname: "",
      lastname: "",
      staffId: "",
      email: "",
      branch: "",
      phone: "",
      address: "",
    },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Staff");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id,
            firstname: data && data.firstname,
            lastname: data && data.lastname,
            staffId: data && data.staffId,
            branch: data && data.branch,
            email: data && data.email,
            phone: data && data.phone_number,
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
          firstname: "",
          lastname: "",
          staffId: "",
          branch: "",
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
      isValid:
        errors.firstname.error ||
        errors.lastname.error ||
        errors.staffId.error ||
        errors.email.error ||
        errors.branch.error
          ? false
          : true,
      errors: errors || {},
    }));
  }, [values]);

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
    if (event.target.name === "email") {
      confirm(event.target.value);
    }
  };
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

  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? addStaff(values)
      : updateStaff(values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        firstname: "",
        lastname: "",
        staffId: "",
        branch: "",
        email: "",
        phone: "",
        address: "",
      },
      touched: {
        ...prev.touched,
        firstname: false,
        lastname: false,
        staffId: false,
        branch: false,
        email: false,
        phone: false,
        address: false,
      },
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
                    isInvalid={hasError("firstname")}
                  >
                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                    <Input
                      type="text"
                      value={values.firstname || ""}
                      name="firstname"
                      id="firstname"
                      ref={firstField}
                      onChange={handleChange}
                      placeholder="Firstname"
                    />
                    <FormErrorMessage>
                      {hasError("firstname")
                        ? errors.firstname && errors.firstname.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("lastname")}
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
                    isInvalid={hasError("staffId")}
                  >
                    <FormLabel htmlFor="staffId">StaffId</FormLabel>
                    <Input
                      type="text"
                      value={values.staffId || ""}
                      name="staffId"
                      id="staffId"
                      onChange={handleChange}
                      placeholder="StaffId"
                    />
                    <FormErrorMessage>
                      {hasError("staffId")
                        ? errors.staffId && errors.staffId.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("email") || exist}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      value={values.email || ""}
                      name="email"
                      id="email"
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <FormErrorMessage>
                      {hasError("email")
                        ? errors.email && errors.email.message
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
                  <FormControl isRequired my="3" isInvalid={hasError("branch")}>
                    <FormLabel htmlFor="branch">Branch</FormLabel>
                    <Select
                      value={values.branch || ""}
                      placeholder="Select option"
                      name="branch"
                      id="branch"
                      onChange={handleChange}
                    >
                      {/* <option>Select One</option> */}
                      {branches &&
                        branches.map((val, index) => (
                          <option value={val._id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </Select>

                    <FormErrorMessage>
                      {hasError("branch")
                        ? errors.branch && errors.branch.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      type="text"
                      value={values.phone || ""}
                      name="phone"
                      id="phone"
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="address">Address</FormLabel>

                    <Textarea
                      value={values.address || ""}
                      name="address"
                      id="address"
                      onChange={handleChange}
                      placeholder="Enter address"
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
                Save Account
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default AccountForm;

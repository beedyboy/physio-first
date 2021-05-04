import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Drawer,
  Divider,
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
const ProfileForm = ({
  mode,
  open,
  reset,
  saved,
  error,
  action,
  sending,
  message,
  updateProfile,
  toggle,
  initial_data,
}) => {
  const toast = useToast();
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
      emergency_phone: "",
      emergency_contact: "",
    },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
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
          branch: data && data.branch.name,
          email: data && data.email,
          phone: data && data.phone_number,
          address: data && data.address,
          emergency_phone: data && data.emergency_phone,
          emergency_contact: data && data.emergency_contact,
        },
      }));
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
          emergency_phone: "",
          emergency_contact: "",
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
        errors.email.error
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
  };
  useEffect(() => {
    if (saved === true && action === "updateProfile") {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
      toggle();
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      reset("action", "");
      resetForm();
      toggle();
    };
  }, [saved, action]);

  useEffect(() => {
    if (error === true && action === "profileUpdateError") {
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
      reset("action", "");
      resetForm();
      toggle();
    };
  }, [error, action]);

  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(values);
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
        onClose={toggle}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Edit Profile</DrawerHeader>

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
                    isReadOnly
                    my="3"
                    isInvalid={hasError("email")}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      value={values.email || ""}
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
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
                <Divider />
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="emergency_phone">
                      Emergency phone
                    </FormLabel>
                    <Input
                      type="text"
                      value={values.emergency_phone || ""}
                      name="emergency_phone"
                      id="emergency_phone"
                      onChange={handleChange}
                      placeholder="emergency_phone"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="emergency_contact">
                      Emergency Contact
                    </FormLabel>
                    <Input
                      type="text"
                      value={values.emergency_contact || ""}
                      name="emergency_contact"
                      id="emergency_contact"
                      onChange={handleChange}
                      placeholder="emergency_contact"
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
                onClick={toggle}
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
                Save Changes
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default ProfileForm;
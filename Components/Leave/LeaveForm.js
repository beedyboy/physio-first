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
  FormHelperText,
  FormErrorMessage,
  DrawerCloseButton,
} from "@chakra-ui/react";
const schema = {
  leave_type: {
    isEmpty: false,
    min: 1,
    message: "A valid Leave type is required",
  },
};
const LeaveForm = ({
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
  addLeave,
  updateLeave,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Leave");
  const [formState, setFormState] = useState({
    values: { id: "", leave_type: "", allowed_days: 0, description: "" },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Leave");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data._id,
            leave_type: data && data.leave_type,
            allowed_days: data && data.allowed_days,
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
          leave_type: "",
          allowed_days: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.leave_type.error || exist ? false : true,
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
    if (event.target.name === "leave_type" && event.target.value.length >= 2) {
      confirm(event.target.value);
    }
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add" ? addLeave(formState.values) : updateLeave(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        leave_type: "",
        allowed_days: "",
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
                    isInvalid={hasError("leave_type") || exist}
                  >
                    <FormLabel htmlFor="leave_type">Leave Type</FormLabel>
                    <Input
                      type="text"
                      value={values.leave_type || ""}
                      ref={firstField}
                      name="leave_type"
                      id="leave_type"
                      onChange={handleChange}
                      placeholder="Leave type"
                    />
                    <FormErrorMessage>
                      {hasError("leave_type")
                        ? errors.leave_type && errors.leave_type.message
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
                    <FormLabel htmlFor="allowed_days">Days allowed</FormLabel>
                    <Input
                      type="number"
                      value={values.allowed_days || ""}
                      name="allowed_days"
                      id="allowed_days"
                      onChange={handleChange}
                      placeholder="Days allowed"
                    />
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
                Save Leave
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default LeaveForm;

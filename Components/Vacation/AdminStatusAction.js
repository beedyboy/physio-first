import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
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
  FormErrorMessage,
  DrawerCloseButton,
} from "@chakra-ui/react";
const schema = {
  status: {
    isEmpty: false,
    min: 1,
    message: "status is required",
  },
};
const AdminStatusAction = ({
  open,
  action,
  reset,
  saved,
  error,
  staffId,
  sending,
  message,
  updateApp,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [formState, setFormState] = useState({
    values: { id: "", status: "", remark: "" },
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
          status: data && data.status,
          remark: data && data.remark,
        },
      }));
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          status: "",
          remark: "",
        },
      }));
    };
  }, [initial_data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.status.error ? false : true,
      errors: errors || {},
    }));
  }, [values]);

  useEffect(() => {
    if (saved === true && action === "adminUpdate") {
      toast({
        title: "Server Response.",
        remark: message,
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
      reset("action", "");
      reset("message", "");
      resetForm();
      handleClose();
    };
  }, [saved, action]);

  useEffect(() => {
    if (error === true) {
      toast({
        title: "Server Response.",
        remark: message,
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
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    values.staffId = staffId;
    updateApp(values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        status: "",
        remark: "",
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
            <DrawerHeader borderBottomWidth="1px">Perform Action</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("status")}
                  >
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select
                      value={values.status || ""}
                      ref={firstField}
                      placeholder="Select option"
                      name="status"
                      id="status"
                      onChange={handleChange}
                    >
                      <option value="Accepted">Accept</option>
                      <option value="Rejected">Reject</option>
                      <option value="Pending">Pending</option>
                    </Select>

                    <FormErrorMessage>
                      {hasError("status")
                        ? errors.status && errors.status.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="remark">Remark</FormLabel>

                    <Textarea
                      value={values.remark || ""}
                      name="remark"
                      id="remark"
                      onChange={handleChange}
                      placeholder="Enter remark"
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
                Save Action
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default AdminStatusAction;

import React, { useEffect, useState, Fragment } from "react";
import moment from "moment";
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
  leave: {
    isEmpty: false,
    min: 1,
    message: "Exeat type is required",
  },
  leave_start_date: {
    isEmpty: false,
    min: 1,
    message: "Start date is required",
  },
  leave_end_date: {
    isEmpty: false,
    message: "End date is required",
  },
};
const ExeatForm = ({
  open,
  reset,
  saved,
  error,
  sending,
  message,
  initial_data,
  mode,
  accountId,
  createExeat,
  updateExeat,
  handleClose,
}) => {
  const dateFormat = "YYYY/MM/DD";
  const toast = useToast();
  const [title, setTitle] = useState("Add Exeat");
  const [formState, setFormState] = useState({
    values: {
      id: "",
      staffId: "",
      leave: "",
      leave_start_date: moment().format(dateFormat),
      leave_end_date: moment().format(dateFormat),
      dateError: false,
      description: "",
    },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState; 
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Exeat");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data?._id,
            staffId: data?.staff,
            leave: data?.leave,
            leave_start_date:  data?.leave_start_date,
            leave_end_date: data?.leave_end_date,
            description: data?.description,
          },
        }));
      }
    } else {
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          staffId: accountId,
        },
      }));
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          staffId: "",
          leave: "",
          leave_start_date: moment().format(dateFormat),
          leave_end_date: moment().format(dateFormat),
          dateError: false,
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
        errors.leave.error ||
        errors.leave_start_date.error ||
        errors.leave_end_date.error ||
        values.dateError
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
    if (event.target.name === "leave_end_date") {
      validateDate();
    }
  };
  const getDaysDiff = (start_date, end_date, date_format = "YYYY-MM-DD") => {
    const getDateAsArray = (date) => {
      return moment(date.split(/\D+/), date_format);
    };
    return (
      getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1
    );
  };
  const validateDate = () => {
    // alert("calling")
    const val = getDaysDiff(values.leave_start_date, values.leave_end_date);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        dateError: val < 0 ? true : false,
      },
    }));
    // alert(val);
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
   mode === "Add"? createExeat(values) :  updateExeat(values);
  };

  const resetForm = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        id: "",
        leave: "",
        leave_start_date: "",
        leave_end_date: "",
        description: "",
      },
      touched: {
        ...formState.touched,
        leave: false,
        leave_start_date: false,
        leave_end_date: false,
        description: false,
      },
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
                  <FormControl isRequired my="3" isInvalid={hasError("leave")}>
                    <FormLabel htmlFor="leave">Exeat Type</FormLabel>
                    <Select
                      value={values.leave || ""}
                      ref={firstField}
                      placeholder="Select option"
                      name="leave"
                      id="leave"
                      onChange={handleChange}
                    >
                      <option value="Sick">Sick</option>
                      <option value="Bereavement">Bereavement</option>
                    </Select>

                    <FormErrorMessage>
                      {hasError("leave")
                        ? errors.leave && errors.leave.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("leave_start_date") || values.dateError}
                  >
                    <FormLabel htmlFor="leave_start_date">Start Date</FormLabel>
                    {/* <Input
                      type="date"
                      defaultValue={
                        values.start_date
                          ? moment(values.leave_start_date, dateFormat)
                          : moment().format(dateFormat)
                      }
                      name="leave_start_date"
                      id="leave_start_date"
                      onChange={handleChange}
                      placeholder="Starting date"
                    /> */}
                    <Input
                      type="date"
                      value={values.leave_start_date || ""}
                      name="leave_start_date"
                      id="leave_start_date"
                      onChange={handleChange}
                    />
                    <FormErrorMessage>
                      {hasError("leave_start_date")
                        ? errors.leave_start_date &&
                          errors.leave_start_date.message
                        : null}
                      {values.dateError
                        ? "Start date must be before the end date"
                        : null}
                    </FormErrorMessage>
                    <FormHelperText>
                      {values.dateError
                        ? "Start date must be before the end date"
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isRequired
                    my="3"
                    isInvalid={hasError("leave_end_date")}
                  >
                    <FormLabel htmlFor="leave_end_date">End Date</FormLabel>
                    <Input
                      type="date"
                      value={values.leave_end_date || ""}
                      name="leave_end_date"
                      id="leave_end_date"
                      onChange={handleChange}
                    />
                    <FormErrorMessage>
                      {hasError("leave_end_date")
                        ? errors.leave_end_date && errors.leave_end_date.message
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
                Apply Now
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default ExeatForm;

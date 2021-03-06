import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Select,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const schema = {
  name: {
    isEmpty: false,
    min: 1,
    message: "Subject is required",
  },
  category: {
    isEmpty: false,
    min: 1,
    message: "Category is required",
  },
  description: {
    min: 5,
    message: "Description cannot be empty",
  },
};

const CreateTicket = ({ saved, message, error, reset, addTicket, sending }) => {
  const toast = useToast();
  const [formState, setFormState] = useState({
    values: {
      id: "",
      name: "",
      category: "",
      email: "",
      staff_id: "",
      user: "User",
      requester: "Staff",
      priority: "Low",
      description: "",
    },
    touched: {},
    errors: {},
  });

  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid:
        errors.name.error || errors.category.error || errors.description.error
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
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      resetForm();
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
      reset("action", "");
      resetForm();
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
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        name: "",
        category: "",
        email: "",
        staff_id: "",
        requester: "Staff",
        priority: "Low",
        user: "User",
        description: "",
      },
      touched: {},
      errors: {},
    }));
  };
  return (
    <Fragment>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing="24px" boxShadow="base" p="6" rounded="md" bg="white">
          <Box>
            <FormControl isRequired my="3" isInvalid={hasError("name")}>
              <FormLabel htmlFor="name">Subject</FormLabel>
              <Input
                type="text"
                value={formState.values.name || ""}
                name="name"
                id="name"
                onChange={handleChange}
                placeholder="Ticket Subject"
              />
              <FormErrorMessage>
                {hasError("name") ? errors.name && errors.name.message : null}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Stack spacing="24px" direction={["column", "row"]}>
            <Box>
              <FormControl my="3">
                <FormLabel htmlFor="category">Related Services</FormLabel>
                <Select
                  value={formState.values.category || ""}
                  placeholder="Related Services"
                  name="category"
                  id="category"
                  onChange={handleChange}
                >
                  <option value="Asset">Asset</option>
                  <option value="Order">Order</option>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl my="3">
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Select
                  value={formState.values.priority || ""}
                  placeholder="Priority"
                  name="priority"
                  id="priority"
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired my="3">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  type="email"
                  value={formState.values.email || ""}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </FormControl>
            </Box>
          </Stack>
          <Box>
            <FormControl my="3">
              <FormLabel htmlFor="description">Description</FormLabel>
              <SunEditor
                onChange={handleContentChange}
                name="description"
                setContents={formState.values.description}
              />
            </FormControl>
          </Box>
        </Stack>
        <Button variant="outline" disabled={sending} mr={3} onClick={resetForm}>
          Reset
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
          Submit Ticket
        </Button>
      </form>
    </Fragment>
  );
};

export default CreateTicket;

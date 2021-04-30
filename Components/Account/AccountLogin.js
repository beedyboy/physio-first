import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero"; 
import {
  Box,
  Wrap,
  Stack,
  Button,
  useToast,
  WrapItem,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";

const AccountLogin = ({
  reset,
  saved,
  error,
  sending,
  message,
  createLogin,
  toggle,
  initial_data,
}) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formState, setFormState] = useState({
    values: { id: "", email: "", password: "" },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    let shouldSetData = typeof initial_data !== "undefined" ? true : false;
    if (shouldSetData) {
      const data = initial_data;
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          id: data && data._id,
          email: data && data.email,
          password: data && data.password,
        },
      }));
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          email: "",
          password: "",
        },
      }));
    };
  }, [initial_data]);
  const { values, isValid, touched } = formState;

  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.email.error || errors.password.error ? false : true,
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
      toggle("role");
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      resetForm();
      toggle("role");
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
      toggle("role");
    };
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createLogin(values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, id: "", email: "", password: "" },
      touched: {
        ...formState.touched,
        email: false,
        password: false,
      },
      errors: {},
    }));
  };
  const hasError = (field) => touched[field] && errors[field].error;

  return (
    <Fragment>
      <Stack spacing="24px">
        <Box>
          <FormControl isDisabled isRequired isReadOnly my="3" isInvalid={hasError("email")}>
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
              {hasError("email") ? errors.email && errors.email.message : null}
            </FormErrorMessage>
             
          </FormControl>
        </Box>

        <Box>
          <FormControl isRequired my="3" isInvalid={hasError("password")}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                value={values.password || ""}
                name="password"
                id="password"
                onChange={handleChange}
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {hasError("password")
                ? errors.password && errors.password.message
                : null}
            </FormErrorMessage>
          </FormControl>
        </Box>

        <Box mt={1} align="right">
          <Wrap spacing="20px">
            <WrapItem>
              <Button
                variant="outline"
                disabled={sending}
                mr={3}
                onClick={() => toggle("login")}
              >
                Cancel
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                disabled={sending || !isValid}
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
            </WrapItem>
          </Wrap>
        </Box>
      </Stack>
    </Fragment>
  );
};

export default AccountLogin;

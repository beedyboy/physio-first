import React, { useState, useEffect } from "react";
import dataHero from "data-hero";
import {
  Box,
  Flex,
  Heading,
  Button,
  Stack,
  Text,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Center,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../../stores/stores";
const schema = {
  email: {
    email: true,
    min: 10,
    message: "A valid email is required",
  },
};
const RequestRecovery = () => {
  const toast = useToast();
  const { authStore } = useMobxStores();
  const {
    sending,
    message,
    resetProperty,
    requestInstruction,
    requestSent,
  } = authStore;
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.email.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    if (requestSent) {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      resetProperty("requestSent", false);
      resetProperty("message", "");
    };
  }, [requestSent]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    requestInstruction(formState.values);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  return (
    <>
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Box align="center">
          <Center w="50vw" h="100vh">
            <Flex direction="column" w="40vw">
              <Box>
                <Heading as="h4">Reset password</Heading>
              </Box>
              <Box mt="2">
                <Text>
                  Enter the email associated with your account and <br />
                  we'll send an email with instructions to reset your password.
                </Text>
              </Box>
              <form mt="2" onSubmit={handleSubmit}>
                <Stack spacing={4} marginBottom="1rem">
                  <FormControl isRequired isInvalid={hasError("email")}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>

                    <Input
                      focusBorderColor="main.500"
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={formState.values.email || ""}
                      placeholder="Enter a valid email address"
                    />
                    <FormErrorMessage>
                      {hasError("email")
                        ? formState.errors.email &&
                          formState.errors.email.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    disabled={!formState.isValid}
                    isLoading={sending}
                    loadingText="Please wait.."
                    colorScheme="core.main"
                  >
                    Send instructions
                  </Button>
                </Stack>
              </form>
            </Flex>
          </Center>
        </Box>
      </Flex>
    </>
  );
};

export default observer(RequestRecovery);

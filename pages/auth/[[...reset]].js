import React, { useState, useEffect } from "react";
import dataHero from "data-hero";
// localhost:3000/#/reset-password/fe05cf0d76293e33f668e220cbedf35870b07491f8d2e9573043987191135558/2
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
import Link from "next/link";
const schema = {
  password: {
    isEmpty: false,
    message: "A valid password is required",
  },
  newpassword: {
    isEmpty: false,
    message: "A valid password is required",
  },
};
const ResetPassword = (props) => {
  const { query } = props;
  const toast = useToast();
  const { authStore } = useMobxStores();
  const {
    sending,
    message,
    resetProperty,
    resetPasswordNow,
    passwordChanged,
  } = authStore;

  useEffect(() => {
    // let id = parseInt(props.match.params.id);
    const { reset } = query;
    let [token, id] = reset;
    console.log({reset})
    setChange(id, token);
  }, []);

  const [matched, setMatched] = useState(false);
  const [matchedTxt, setMatchedTxt] = useState("");
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      password: "",
      newpassword: "",
      token: "",
      staff_id: "",
    },
    touched: {},
    errors: {},
  });

  const setChange = (id, token) => { 
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        token,
        staff_id: id,
      },
    }));
  };

  const { values } = formState;
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.password.error ? false : true,
      errors: errors || {},
    }));
  }, [values]);

  useEffect(() => {
    confirmMatch();
  }, [values.newpassword, values.password]);

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

  const confirmMatch = () => {
    if (values.password === values.newpassword) {
      setMatchedTxt("");
      setMatched(true);
    } else {
      setMatchedTxt("Password does not match");
      setMatched(false);
    }
  };

  useEffect(() => {
    if (passwordChanged) {
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
      resetProperty("passwordChanged", false);
      resetProperty("message", "");
    };
  }, [passwordChanged]);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordNow(formState.values);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const isMatched = () => formState.touched["newpassword"] && matched === false;

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
                <Text>Enter new password</Text>
              </Box>
              <form mt="1" onSubmit={handleSubmit}>
                <Stack spacing={4} marginBottom="1rem">
                  <FormControl isRequired isInvalid={hasError("password")}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      focusBorderColor="main.500"
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={formState.values.password || ""}
                      placeholder="Enter a valid password"
                    />
                    <FormErrorMessage>
                      {hasError("password")
                        ? formState.errors.password &&
                          formState.errors.password.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={hasError("newpassword")}>
                    <FormLabel htmlFor="newpassword">
                      Confirm Password
                    </FormLabel>
                    <Input
                      focusBorderColor="main.500"
                      type="password"
                      name="newpassword"
                      id="newpassword"
                      onChange={handleChange}
                      value={formState.values.newpassword || ""}
                      placeholder="Enter a valid password"
                    />
                    <FormErrorMessage>
                      {hasError("newpassword")
                        ? formState.errors.newpassword &&
                          formState.errors.newpassword.message
                        : null}
                    </FormErrorMessage>
                    <Text mt={"1rem"} mr={"23rem"} color="red">
                      {matchedTxt}
                    </Text>
                  </FormControl>

                  <Button
                    type="submit"
                    disabled={!formState.isValid || !matched}
                    isLoading={sending}
                    loadingText="Please wait.."
                    colorScheme="core.main"
                  >
                    Change Password
                  </Button>
                </Stack>
              </form>
              <Box>
                <Link href="/auth/login">
                  <a>Back to login</a>
                </Link>
              </Box>
            </Flex>
          </Center>
        </Box>
      </Flex>
    </>
  );
};
ResetPassword.getInitialProps = async ({ query }) => {
  return { query };
};

export default observer(ResetPassword);

import React, { useState, useEffect } from "react";
import dataHero from "data-hero";
import Head from "next/head";
import { Heading, Box, Text, Button } from "@chakra-ui/react"; 
import Link from "next/link";
const schema = {
  email: {
    email: true,
    min: 10,
    message: "A valid email is required",
  },
  password: {
    min: 5,
    isEmpty: false,
    message: "password is required",
  },
};
function Login() {

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
      password: "",
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);

    setFormState((formState) => ({
      ...formState,
      isValid: errors.email.error || errors.password.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    login(formState.values);
    // isAuthenticated === true ? history.push('/'): null;
  };
  const { from } = props.location.state || { from: { pathname: "/dashboard" } };
  if (isAuthenticated === true) {
    return <Redirect to={from} />;
  }

  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field].error;
  };
  return (
    <>
      <Head>
        <title>Core App | Login</title>
      </Head>
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
                    Login
                  </Button>
                </Stack>
              </form>
              <Box>
                <Link href="/auth/request-reset">
                  <a>forgot password ?</a>
                </Link>
              </Box>
            </Flex>
          </Center>
        </Box>
      </Flex>
      {/* <Layout> 
<Box maxW="32rem">
  <Heading mb={4}>Modern online and offline payments for Africa</Heading>
  <Text fontSize="xl">
    Paystack helps businesses in Africa get paid by anyone, anywhere in the
    world
  </Text>
  <Button size="lg" colorScheme="green" mt="24px">
    Create a free account
  </Button>
</Box>
     </Layout> */}
    </>
  );
}

export default Login;

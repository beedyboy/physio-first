import React, { useState, useEffect } from "react";
import dataHero from "data-hero";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  Input,
  Stack,
  Center,
  Button,
  Heading,
  useToast,
  FormLabel,
  InputGroup,
  FormControl,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMobxStores } from "../../stores/stores";
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
  const router = useRouter();
  const toast = useToast();
  const { authStore } = useMobxStores();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { isAuthenticated, resetProperty, login, message, sending } = authStore;
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
      password: "",
    },
    touched: {},
    errors: {},
  });
  const { values, isValid, errors, touched } = formState;

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
  };
 
  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      router.push("/");
    }
    return () => {
      resetProperty("isAuthenticated", false);
      resetProperty("message", "");
    };
  }, [isAuthenticated]);

  const hasError = (field) => touched[field] && errors[field].error;

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
                <Heading as="h4">Welcome back</Heading>
              </Box>
              <Box mt="2">
                <Text>Enter password</Text>
              </Box>
              <form mt="1" onSubmit={handleSignIn}>
                <Stack spacing={4} marginBottom="1rem">
                  <Box>
                    <FormControl
                      isRequired
                      my="3"
                      isInvalid={hasError("email")}
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
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl
                      isRequired
                      my="3"
                      isInvalid={hasError("password")}
                    >
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

                  <Button
                    type="submit"
                    disabled={!isValid || sending}
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

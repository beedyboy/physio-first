import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import Head from "next/head";
import Layout from "../templates/Private/Layout";
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
import { observer } from "mobx-react";
import dataHero from "data-hero";
import { useMobxStores } from "../stores/stores";
const schema = {
  signature: {
    isEmpty: false,
    min: 1,
    message: "Signature is required",
  },
};

const CEO_STORY = (props) => {
  const toast = useToast();
  const { userStore } = useMobxStores();
  const { signStory, sending, action, errMessage, message, error } = userStore;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const { pdf, id, signed } = props;
  const [formState, setFormState] = useState({
    values: {
      id: id,
      signature: "",
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.signature.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    if (action === "signed") {
      if (message) {
        toast({
          title: "Server Response.",
          description: message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    if (error) {
      toast({
        title: "Server Response.",
        description: errMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [action]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
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
    signStory(formState.values);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  return (
    <>
      <Head>
        <title>Physio First | CEO Story</title>
      </Head>
      <Layout>
        <Heading mb={4}>CEO Story</Heading>

        <Stack
          direction="column"
          spacing="24px"
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box>
            <Document
              file={pdf}
              options={{ workerSrc: "/pdf.worker.js" }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Box>
          <Flex>
            <Box>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </Box>
            <Flex justify="space-between">
              <Button
                type="button"
                colorScheme="core.main"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                Previous
              </Button>
              <Button
                type="button"
                colorScheme="teal"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </Button>
            </Flex>
          </Flex>

          <Box>
            {signed && signed === "Yes" ? null : (
              <>
                <FormControl isRequired isInvalid={hasError("newpassword")}>
                  <FormLabel htmlFor="newpassword">Sign Here</FormLabel>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="signature"
                    id="signature"
                    onChange={handleChange}
                    value={formState.values.signature || ""}
                    placeholder="Enter your name"
                  />
                  <FormErrorMessage>
                    {hasError("signature")
                      ? formState.errors.signature &&
                        formState.errors.signature.message
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <div className="mt-5 text-right">
                  <Button
                    type="submit"
                    disabled={!formState.isValid || sending}
                    isLoading={sending}
                    onClick={handleSubmit}
                    loadingText="Please wait.."
                    colorScheme="core.main"
                  >
                    Save
                  </Button>
                </div>
              </>
            )}
          </Box>
        </Stack>
      </Layout>
    </>
  );
};
export default observer(CEO_STORY);

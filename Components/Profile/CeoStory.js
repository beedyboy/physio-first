import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import {
  Box,
  Flex,
  Button,
  Stack,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Center,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import dataHero from "data-hero";
import { useMobxStores } from "../../stores/stores";
const schema = {
  signature: {
    isEmpty: false,
    min: 1,
    message: "Signature is required",
  },
};

const CEOSTORY = (props) => {
  const toast = useToast();
  const { userStore } = useMobxStores();
  const { signStory, sending, action, resetProperty, message } = userStore;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const { id, signed } = props;
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
    return () => {
      resetProperty("error", false);
      resetProperty("errMessage", "");
      resetProperty("message", "");
      resetProperty("action", "");  
    };
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
            file="/Ceo_story_word.pdf"
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
    </>
  );
};
export default observer(CEOSTORY);

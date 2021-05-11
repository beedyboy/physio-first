import React, { Fragment, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import dataHero from "data-hero";
import {
  Box,
  Stack,
  Button,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useMobxStores } from "../../stores/stores";
const schema = {
  description: {
    isEmpty: false,
    min: 1,
    message: "Description is required",
  },
};

const AddConversation = ({ id, respondent }) => {
  const toast = useToast();
  const {conversationStore} = useMobxStores();
  const {
    createConversation,
    sending,
    saved,
    error,
    resetProperty,
    message,
  } = conversationStore;
  const [formState, setFormState] = useState({
    values: { id: "", respondent: respondent, description: "", ticket: id },
    touched: {},
    errors: {},
  });

  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.description.error ? false : true,
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
      resetProperty("saved", false);
      resetProperty("message", "");
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
      resetProperty("error", false);
      resetProperty("message", "");
      resetProperty("action", "");
      resetForm();
    };
  }, [error]);

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
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        respondent: respondent,
        description: "",
        ticket: id,
      },
      touched: {},
      errors: {},
    }));
  };
  return (
    <Fragment>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing="24px">
          <Box>
            <FormControl isRequired my="3" isInvalid={hasError("description")}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <SunEditor
                onChange={handleContentChange}
                name="description"
                setContents={formState.values.description}
              />
              <FormErrorMessage>
                {hasError("description")
                  ? errors.description && errors.description.message
                  : null}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Button
            variant="outline"
            disabled={sending}
            mr={3}
            onClick={resetForm}
          >
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
            Send
          </Button>
        </Stack>
      </form>
    </Fragment>
  );
};
export default observer(AddConversation);

import React, { useState, useEffect } from "react"; 
import {
  Box,
  Flex,
  Button,
  Stack,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage, 
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
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
  const hasError = (field) => formState.touched[field] && formState.errors[field].error;
 
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
         
          <iframe width="100%" src="/assets/docs/Ceo_story_word.pdf"></iframe>
        </Box>
        

        <Box>
          {signed && signed ? null : (
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

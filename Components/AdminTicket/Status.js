import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Select,
  useToast,
  FormLabel,
  FormControl,
} from "@chakra-ui/react"; 
const Status = ({ data, sending, toggleStatus, action, error, toggle }) => {
  const toast = useToast();
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setStatus(data.status);
    setId(data._id);
  }, [data]);
 
  useEffect(() => {
    if (action === "statusChangedError") {
        toast({
          title: "Server Response.",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else if(action === "statusChanged") {
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
      reset("error", false);
      reset("action", "");
      reset("message", "");
      resetForm();
      toggle('status');
    };
  }, [error]);
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = {
      status,
      id,
    };
    toggleStatus(subData);
  };
  return (
    <Fragment>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing="24px" boxShadow="base" p="6" rounded="md" bg="white">
          <Box>
            <FormControl my="3">
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select
                value={status || ""}
                placeholder="Priority"
                name="status"
                id="status"
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="InProgress">InProgress</option>
                <option value="Closed">Closed</option>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Button
          disabled={sending}
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
          Update Status
        </Button>
      </form>
    </Fragment>
  );
};

export default Status;

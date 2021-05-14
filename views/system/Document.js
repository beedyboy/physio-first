import React, { useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Flex,
  Button,
  Heading,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import DocumentList from "../../Components/Document/DocumentList";
import { useMobxStores } from "../../stores/stores";
import DocumentForm from "../../Components/Document/DocumentForm";

import { MdAdd } from "react-icons/md";
function Document() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { directorStore } = useMobxStores();
  const {
    error,
    saved, 
    message,
    removed,
    loading,
    sending, 
    documents,
    fetchDocument,
    resetProperty,
    removeDocument, 
    createDocument,
    updateDocument,
  } = directorStore;

  useEffect(() => {
    fetchDocument();
  }, []);

  useEffect(() => {
    if (removed === true) {
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
      resetProperty("removed", false);
      resetProperty("message", "");
    };
  }, [removed]);

  const newDocument = () => {
    setMode("Add");
    onOpen();
  };

  return (
    <Fragment>
      <Flex
        direction="column"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box d="flex" justifyContent="space-between">
          <Heading mb={4}>Document</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newDocument}
          >
            Add New
          </Button>
        </Box>
        <Box>
          <DocumentList
            data={documents}
            setMode={setMode}
            toggle={onOpen}
            removeData={removeDocument}
            rowData={setRowData}
          />
        </Box>
      </Flex>
      <DocumentForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}  
        message={message}
        sending={sending}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        createDocument={createDocument}
        updateDocument={updateDocument}
      />
    </Fragment>
  );
}

export default observer(Document);

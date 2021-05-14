import React, { useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Flex,
  Button,
  Heading,
  useToast,
  Text,
  Skeleton,
  SimpleGrid,
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
  const { DocumentStore } = useMobxStores();
  const {
    error,
    saved,
    exist,
    message,
    removed,
    loading,
    sending,
    checking,
    Documents,
    fetchDocument,
    resetProperty,
    removeDocument,
    confirmDocument,
    createDocument,
    updateDocument,
  } = DocumentStore;

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
        <Skeleton isLoaded={!loading}>
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="10px">
            {Documents && Documents.length < 1 ?
            <Text as="p" fontWeight="bolder">No record found!</Text>
            :
            Documents &&
              Documents.map((Document) => (
                <DocumentList
                data={Document}
                setMode={setMode}
                toggle={onOpen}
                removeData={removeDocument}
                rowData={setRowData}
              />
              ))}
            </SimpleGrid>
          </Skeleton>
        {/* <Box> 
            {Documents && Documents.length < 1 ?
            <Text as="p" fontWeight="bolder">No record found!</Text>
            :
            Documents &&
              Documents.map((Document) => (
                <DocumentList
                data={Document}
                setMode={setMode}
                toggle={onOpen}
                removeData={removeDocument}
                rowData={setRowData}
              />
              ))}
                 
        </Box> */}
      </Flex>
      <DocumentForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        exist={exist}
        checking={checking}
        confirm={confirmDocument}
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

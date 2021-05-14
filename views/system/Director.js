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
import DirectorList from "../../Components/Director/DirectorList";
import { useMobxStores } from "../../stores/stores";
import DirectorForm from "../../Components/Director/DirectorForm";

import { MdAdd } from "react-icons/md";
function Director() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { directorStore } = useMobxStores();
  const {
    error,
    saved,
    exist,
    message,
    removed,
    loading,
    sending,
    checking,
    directors,
    fetchDirector,
    resetProperty,
    removeDirector,
    confirmDirector,
    createDirector,
    updateDirector,
  } = directorStore;

  useEffect(() => {
    fetchDirector();
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

  const newDirector = () => {
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
          <Heading mb={4}>Director</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newDirector}
          >
            Add New
          </Button>
        </Box>
        <Skeleton isLoaded={!loading}>
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="10px">
            {directors && directors.length < 1 ?
            <Text as="p" fontWeight="bolder">No record found!</Text>
            :
            directors &&
              directors.map((director) => (
                <DirectorList
                data={director}
                setMode={setMode}
                toggle={onOpen}
                removeData={removeDirector}
                rowData={setRowData}
              />
              ))}
            </SimpleGrid>
          </Skeleton>
        {/* <Box> 
            {directors && directors.length < 1 ?
            <Text as="p" fontWeight="bolder">No record found!</Text>
            :
            directors &&
              directors.map((director) => (
                <DirectorList
                data={director}
                setMode={setMode}
                toggle={onOpen}
                removeData={removeDirector}
                rowData={setRowData}
              />
              ))}
                 
        </Box> */}
      </Flex>
      <DirectorForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        exist={exist}
        checking={checking}
        confirm={confirmDirector}
        message={message}
        sending={sending}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        createDirector={createDirector}
        updateDirector={updateDirector}
      />
    </Fragment>
  );
}

export default observer(Director);

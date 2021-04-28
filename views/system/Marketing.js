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
import MarketingList from "../../Components/Marketing/MarketingList";
import { useMobxStores } from "../../stores/stores";
import MarketingForm from "../../Components/Marketing/MarketingForm";

import { MdAdd } from "react-icons/md";
function Marketing() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { marketingStore } = useMobxStores();
  const {
    error,
    saved,
    exist,
    message,
    removed,
    sending,
    links,
    checking, 
    resetProperty,
    getLinks,
    addLink,
    updateLink,
    deleteLink,
  } = marketingStore;

  useEffect(() => {
    getLinks();
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

  const newMarketing = () => {
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
          <Heading mb={4}>Marketing</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newMarketing}
          >
            Add New
          </Button>
        </Box>
        <Box>
          <MarketingList
            data={links}
            setMode={setMode}
            toggle={onOpen}
            removeData={deleteLink}
            rowData={setRowData}
          />
        </Box>
      </Flex>
      <MarketingForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        exist={exist}
        message={message}
        sending={sending}
        checking={checking}
        handleClose={onClose} 
        initial_data={rowData}
        reset={resetProperty}
        addLink={addLink}
        updateLink={updateLink}
      />
    </Fragment>
  );
}

export default observer(Marketing);

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
import LeaveList from "../../Components/Leave/LeaveList";
import { useMobxStores } from "../../stores/stores";
import LeaveForm from "../../Components/Leave/LeaveForm";

import { MdAdd } from "react-icons/md";
function Leave() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { leaveStore } = useMobxStores();
  const {
    error,
    saved,
    exist,
    message,
    removed,
    sending,
    leaves,
    checking,
    confirmName,
    resetProperty,
    getLeaves,
    addLeave,
    updateLeave,
    removeLeave,
  } = leaveStore;

  useEffect(() => {
    getLeaves();
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

  const newLeave = () => {
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
          <Heading mb={4}>Leave</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newLeave}
          >
            Add New
          </Button>
        </Box>
        <Box>
          <LeaveList
            data={leaves}
            setMode={setMode}
            toggle={onOpen}
            removeData={removeLeave}
            rowData={setRowData}
          />
        </Box>
      </Flex>
      <LeaveForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        exist={exist}
        message={message}
        sending={sending}
        checking={checking}
        handleClose={onClose}
        confirm={confirmName}
        initial_data={rowData}
        reset={resetProperty}
        addLeave={addLeave}
        updateLeave={updateLeave}
      />
    </Fragment>
  );
}

export default observer(Leave);

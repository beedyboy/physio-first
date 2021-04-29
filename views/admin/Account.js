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
import AccountList from "../../Components/ Account/ AccountList";
import { useMobxStores } from "../../stores/stores";
import AccountForm from "../../Components/ Account/ AccountForm";

import { MdAdd } from "react-icons/md";
const Account = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [modal, setModal] = useState({
    login: false, 
    role: false
  });
  const [rowData, setRowData] = useState();
  const { userStore, branchStore } = useMobxStores();
  const { branch, getBranches } = branchStore;
  const {
    error,
    saved,
    exist,
    message,
    removed,
    sending,
    users,
    checking,
    confirmEmail,
    resetProperty,
    getUsers,
    addStaff,
    addStaff,
    setRole,
     removeStaff,
  } = userStore;
 const { role } = modal;

  useEffect(() => {
    getBranches();
    getUsers();
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

  const newAccount = () => {
    setMode("Add");
    onOpen();
  };

  const toggleModal = (id) => {
    setModal((state) => ({
      ...state,
      [id]: !modal[id];
    }))
    if(acl === false) { 
    setACL(true);  
    } else {
      setACL(false);
      setId(0);  
    }
  }

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
          <Heading mb={4}> Account</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newAccount}
          >
            Add New
          </Button>
        </Box>
        <Box>
          <AccountList
            data={users}
            setMode={setMode}
            toggle={onOpen}
            removeData={ removeStaff}
            rowData={setRowData}
          />
        </Box>
      </Flex>
      <AccountForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        exist={exist}
        message={message}
        sending={sending}
        checking={checking}
        confirm={confirmEmail}
        branches={branch}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        addStaff={addStaff}
        updateStaff={updateStaff}
      />
      <ModalWidget id="role"  toggle={toggleModal}>
        <ACL open={modal.role}
          saved={saved}
        error={error}
        exist={exist}
        message={message}
        sending={sending} 
        reset={resetProperty} assignRole={setRole} toggle={toggleModal} initial_data={rowData} />
      </ModalWidget>
    </Fragment>
  );
}

export default observer(Account);

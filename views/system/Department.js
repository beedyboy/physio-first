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
import NoAccess from "../../widgets/NoAccess";
import DepartmentList from "../../Components/Department/DepartmentList";
import { useMobxStores } from "../../stores/stores";
import DepartmentForm from "../../Components/Department/DepartmentForm";

import { MdAdd } from "react-icons/md";
function Department(props) {
  const { pageAccess, canAdd } = props;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { departmentStore } = useMobxStores();
  const {
    error,
    saved,
    exist,
    message,
    removed,
    sending,
    department,
    checking,
    confirmName,
    resetProperty,
    getDepartments,
    createDepartment,
    updateDepartment,
    removeDepartment,
  } = departmentStore;

  useEffect(() => {
    getDepartments();
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

  const newDepartment = () => {
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
         {pageAccess ? 
        <>
        <Box d="flex" justifyContent="space-between">
          <Heading mb={4}>Department</Heading>

        {canAdd ?
          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newDepartment}
          >
            Add New
          </Button>
          : null}
        </Box>
        <Box>
          <DepartmentList
            data={department}
            setMode={setMode}
            toggle={onOpen}
            removeData={removeDepartment}
            rowData={setRowData}
            {...props}
          />
        </Box>
        </>
       : (
        <NoAccess page="category" />
      )}{" "} 
      </Flex>
      <DepartmentForm
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
        createDepartment={createDepartment}
        updateDepartment={updateDepartment}
      />
    </Fragment>
  );
}

export default observer(Department);

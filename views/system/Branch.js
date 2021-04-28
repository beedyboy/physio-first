import React, { useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Heading, Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import BranchList from "../../Components/Branch/BranchList";
import { useMobxStores } from "../../stores/stores";
import BranchForm from "../../Components/Branch/BranchForm";
 
import { MdAdd } from "react-icons/md"
function Branch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { branchStore } = useMobxStores();
  const {
    branch,
    error,
    saved,
    message,
    sending,
    getBranches,
    createBranch,
    updateBranch,
    removeBranch,
    resetProperty,
  } = branchStore;

  useEffect(() => {
    getBranches();
  }, []);
  const newBranch = () => {
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
        <Box d="flex"  justifyContent="space-between">
          <Heading mb={4}>Branch</Heading>

          <Button
            leftIcon={<MdAdd/>}
            colorScheme="teal"
            p="2rem"
            onClick={newBranch}
          >
            Add New
          </Button>
        </Box>
        <Box>
          <BranchList
            data={branch}
            setMode={setMode}
            toggle={onOpen}
            removeData={removeBranch}
            rowData={setRowData}
          />
        </Box>
      </Flex>
      <BranchForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        message={message}
        sending={sending}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        createBranch={createBranch}
        updateBranch={updateBranch}
      />
    </Fragment>
  );
}

export default observer(Branch);

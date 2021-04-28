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
import CategoryList from "../../Components/Category/CategoryList";
import { useMobxStores } from "../../stores/stores";
import CategoryForm from "../../Components/Category/CategoryForm";

import { MdAdd } from "react-icons/md";
function Category() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { categoryStore } = useMobxStores();
  const {
    error,
    saved,
    exist,
    message,
    removed,
    sending,
    category,
    checking,
    confirmName,
    resetProperty,
    getCategories,
    createCategory,
    updateCategory,
    removeCategory,
  } = categoryStore;

  useEffect(() => {
    getCategories();
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

  const newCategory = () => {
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
          <Heading mb={4}>Category</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newCategory}
          >
            Add New
          </Button>
        </Box>
        <Box>
          <CategoryList
            data={category}
            setMode={setMode}
            toggle={onOpen}
            removeData={removeCategory}
            rowData={setRowData}
          />
        </Box>
      </Flex>
      <CategoryForm
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
        createCategory={createCategory}
        updateCategory={updateCategory}
      />
    </Fragment>
  );
}

export default observer(Category);

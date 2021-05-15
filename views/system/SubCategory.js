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
import SubCategoryList from "../../Components/SubCategory/SubCategoryList";
import { useMobxStores } from "../../stores/stores";
import SubCategoryForm from "../../Components/SubCategory/SubCategoryForm";

import { MdAdd } from "react-icons/md";
function SubCategory(props) {
  const { pageAccess, canAdd, canView } = props;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { subCategoryStore, categoryStore } = useMobxStores();
  const { category, getCategories } = categoryStore;
  const {
    error,
    saved,
    exist,
    message,
    removed,
    sending,
    subcategory,
    checking,
    confirmRow,
    resetProperty,
    getSubCategories,
    addSubCat,
    updateSubCat,
    deleteSubCat,
  } = subCategoryStore;

  useEffect(() => {
    getCategories();
    getSubCategories();
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
        {pageAccess ? (
          <>
            <Box d="flex" justifyContent="space-between">
              <Heading mb={4}>SubCategory</Heading>

              {canAdd ? (
                <Button
                  leftIcon={<MdAdd />}
                  colorScheme="teal"
                  p="2rem"
                  onClick={newCategory}
                >
                  Add New
                </Button>
              ) : null}
            </Box>
            {canView ? (
              <>
                <Box>
                  <SubCategoryList
                    data={subcategory}
                    setMode={setMode}
                    toggle={onOpen}
                    removeData={deleteSubCat}
                    rowData={setRowData}
                    {...props}
                  />
                </Box>{" "}
              </>
            ) : null}
          </>
        ) : (
          <NoAccess page="sub-category" />
        )}{" "}
      </Flex>
      <SubCategoryForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        exist={exist}
        message={message}
        sending={sending}
        checking={checking}
        confirm={confirmRow}
        categories={category}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        addSubCat={addSubCat}
        updateSubCat={updateSubCat}
      />
    </Fragment>
  );
}

export default observer(SubCategory);

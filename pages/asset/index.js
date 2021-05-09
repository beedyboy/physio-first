import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { Flex, Button, Box, Heading, useDisclosure } from "@chakra-ui/react";
import Layout from "../../templates/Private/Layout";
import { useMobxStores } from "../../stores/stores";
import { MdAdd } from "react-icons/md";
import { observer } from "mobx-react-lite";
import AssetForm from "../../Components/Asset/AssetForm";
import AssetList from "../../Components/Asset/AssetList";

function Asset(props) {
  const [mode, setMode] = useState("");
  const {
    assetStore,
    departmentStores,
    categoryStore,
    subCategoryStore,
  } = useMobxStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    createAsset,
    updateAsset,
    sending,
    message,
    error,
    action,
    assets,
    fetchAsset,
    removeAsset,
    resetProperty,
    confirmRow,
  } = assetStore;
  const { getDepartments, department } = departmentStores;
  const { getCategories, category } = categoryStore;
  const { getCategoryBySub, categorysubs } = subCategoryStore;

  useEffect(() => {
    fetchAsset();
    getCategories();
    getDepartments();
  }, []);

  const newAsset = () => {
    onOpen();
  };
  return (
    <>
      <Head>
        <title>Physio First | Asset</title>
      </Head>
      <Layout>
        <Flex
          direction="column"
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box d="flex" justifyContent="space-between">
            <Heading mb={4}> Asset</Heading>

            <Button
              leftIcon={<MdAdd />}
              colorScheme="teal"
              p="2rem"
              onClick={newAsset}
            >
              Add
            </Button>
          </Box>
          <Box>
            <AssetList data={assets} />
          </Box>
        </Flex>
      </Layout>
      <AssetForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        categories={category}
        message={message}
        sending={sending}
        handleClose={onClose}
        reset={resetProperty}
        createAsset={createAsset}
        updateAsset={updateAsset}
        getCategoryBySub={getCategoryBySub}
        categorysubs={categorysubs}
        createVacation={createVacation}
      />
    </>
  );
}

export default observer(Asset);

import React, { useState, useEffect } from "react";
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
  const [rowData, setRowData] = useState();
  const { assetStore, categoryStore, subCategoryStore } = useMobxStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    createAsset,
    updateAsset,
    sending,
    message,
    error,
    saved,
    assets,
    fetchAsset,
    removeAsset,
    resetProperty,
    confirmRow,
  } = assetStore;
  const { getCategories, category } = categoryStore;
  const { getCategoryBySub, categorysubs } = subCategoryStore;

  useEffect(() => {
    fetchAsset();
    getCategories();
  }, []);

  const newAsset = () => {
    setMode("Add");
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
            <AssetList data={assets}  setMode={setMode}
            toggle={onOpen} 
            rowData={setRowData} removeData={removeAsset} />
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
        initial_data={rowData}
        handleClose={onClose}
        reset={resetProperty}
        createAsset={createAsset}
        updateAsset={updateAsset}
        getCategoryBySub={getCategoryBySub}
        categorysubs={categorysubs} 
      />
    </>
  );
}

export default observer(Asset);

import React, { useEffect } from "react";
import Head from "next/head";
import { Flex, Button, Box } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout"; 
import { useMobxStores } from '../stores/stores';

function Vacation(props) {
const { leaveStore } = useMobxStores

const { 
  leaves,
  getLeaves
} = leaveStore;
  useEffect(() => {
    getLeaves();
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Physio First | Vacation</title>
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
          <Heading mb={4}> Vacation</Heading>

          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            p="2rem"
            onClick={newAccount}
          >
           Apply
          </Button>
        </Box>
        <Box>
          <AccountList
            data={users}
            setMode={setMode}
            toggle={onOpen}
            removeData={removeStaff}
            rowData={setRowData}
            setModal={toggleModal}
          />
        </Box>
      </Flex>
      
      </Layout>
    </>
  );
}

export default Vacation;

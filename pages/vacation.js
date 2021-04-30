import React, { useEffect } from "react";
import Head from "next/head";
import { Flex, Button, Box, useDisclosure } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import { useMobxStores } from "../stores/stores";
import MyVacations from "../Components/Vacation/MyVacations";
import MyVacationForm from "../Components/Vacation/MyVacationForm";

function Vacation(props) {
  const { leaveStore } = useMobxStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { leaves, getLeaves } = leaveStore;
  const {
    vacations,
    error,
    saved,
    message,
    sending,
    getMyApplications,
    createVacation,
    resetProperty,
  } = branchStore;
  useEffect(() => {
    getLeaves();
    getMyApplications();
  }, []);

  const apply = () => {
    setMode("Add");
    onOpen();
  };
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
              onClick={apply}
            >
              Apply
            </Button>
          </Box>
          <Box>
            <MyVacations data={vacations} />
          </Box>
        </Flex>
      </Layout>
      <MyVacationForm
        open={isOpen}
        saved={saved}
        error={error}
        leaves={leaves}
        message={message}
        sending={sending}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        createVacation={createVacation}
      />
    </>
  );
}

export default Vacation;

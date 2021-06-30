import React, { useEffect } from "react";
import Head from "next/head";
import { Flex, Button, Box, Heading, useDisclosure } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import { useMobxStores } from "../stores/stores";
import MyVacations from "../Components/Vacation/MyVacations";
import MyVacationForm from "../Components/Vacation/MyVacationForm";
import { MdAdd } from "react-icons/md";
import { observer } from "mobx-react-lite";

function Vacation(props) {
  const { access } = props;
  const leaveApply = access && access.leave && access.leave.apply;
  const { leaveStore, vacationStore } = useMobxStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { leaves, getLeaves } = leaveStore;
  const {
    error,
    saved,
    sending,
    message,
    resetProperty,
    createVacation,
    myApplications,
    getMyApplications,
  } = vacationStore;
  useEffect(() => {
    getLeaves();
    getMyApplications();
  }, []);

  const apply = () => {
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

            {leaveApply ? (
              <Button
                leftIcon={<MdAdd />}
                colorScheme="teal"
                p="2rem"
                onClick={apply}
              >
                Apply
              </Button>
            ) : null}
          </Box>
          <Box>
            <MyVacations data={myApplications} />
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
        reset={resetProperty}
        createVacation={createVacation}
      />
    </>
  );
}

export default observer(Vacation);

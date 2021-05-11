import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Layout from "../../../templates/Private/Layout";
import { useMobxStores } from "../../../stores/stores";
import AdminTicketList from "../../../Components/AdminTicket/AdminTicketList";
import {
  Flex,
  Button,
  Box,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import TicketForm from "../../../Components/AdminTicket/TicketForm";
import { MdAdd } from "react-icons/md";
const index = (props) => {
  const { access } = props;
  const canManage = access && access.ticket && access.ticket.manage;
  // console.log({canManage})
  const toast = useToast();
  const { ticketStore, userStore } = useMobxStores();
  const {
    addTicket,
    updateTicket,
    fetchTicket,
    tickets,
    error,
    saved,
    action,
    message,
    removed,
    resetProperty,
    sending,
  } = ticketStore;
  const { getUsers, users } = userStore;
  const [rowData, setRowData] = useState();
  const [mode, setMode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetchTicket();
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

  const newTicket = () => {
    setMode("Add");
    onOpen();
  };
  return (
    <Fragment>
      <Head>
        <title>Physio First | Ticket management</title>
      </Head>
      <Layout>
        {!canManage ?
        <>
        <Flex
          direction="column"
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box d="flex" justifyContent="space-between">
            <Heading mb={4}> Ticket management</Heading>

            <Button
              leftIcon={<MdAdd />}
              colorScheme="teal"
              p="2rem"
              onClick={newTicket}
            >
              Create Ticket
            </Button>
          </Box>
          <Box>
            <AdminTicketList
              data={tickets}
              setMode={setMode}
              toggle={onOpen}
              rowData={setRowData}
            />
          </Box>
        </Flex>
     </>
     :
<Heading as="h1">You do not have access to this page</Heading>
        }
      </Layout>
      <TicketForm
        mode={mode}
        open={isOpen}
        saved={saved}
        error={error}
        users={users}
        message={message}
        sending={sending}
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty}
        addTicket={addTicket}
        updateTicket={updateTicket}
      />
    </Fragment>
  );
};

export default observer(index);

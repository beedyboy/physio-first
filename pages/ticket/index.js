import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { Flex, Button, Box, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import Layout from "../../templates/Private/Layout";
import { useMobxStores } from "../../stores/stores";
import { CgViewList, CgPlayListAdd } from "react-icons/cg";
import { observer } from "mobx-react-lite";
import TicketHome from "../../Components/Ticket/TicketHome";
import TicketList from "../../Components/Ticket/TicketList";
import CreateTicket from "../../Components/Ticket/CreateTicket";
import TicketSummary from "../../Components/Ticket/TicketSummary";
function index(props) {
  const [page, setPage] = useState("home");
  const { ticketStore } = useMobxStores();
  const {
    addTicket,
    sending,
    saved,
    message,
    fetchMyTicket,
    myTickets: tickets,
    removeTicket,
    error,
    resetProperty
  } = ticketStore;
  useEffect(() => {
    fetchMyTicket();
  }, []);
  const handlePage = (e, item) => {
    e.preventDefault();
    setPage(item);
  };
  return (
    <Fragment>
      <Head>
        <title>Physio First | Ticket</title>
      </Head>
      <Layout>
        <Flex direction={["column", "row"]} align="space-between" justifyContent="space-between">
          <Box width="30%" mr={1} boxShadow="base" p="6" rounded="md" bg="white">
          <Text fontWeight="bolder" fontSize="sm">Recent Ticket(s)</Text>
            {tickets && tickets.length === 0 ? (
              <Text mt={2} fontWeight="normal">No available ticket </Text>
            ) : (
              tickets &&
              tickets
                .slice(0, 5)
                .map((ticket) => (
                  <TicketSummary key={ticket._id} row={ticket} />
                ))
            )}
          </Box>
          <Box flex="1" ml={2}>
            <Heading as="h1">Ticket Management</Heading>
            <Flex
            mt={2}
              direction="column"
              align="space-between"
              justifyContent="space-between"
            >
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme="blue"
                  onClick={(e) => handlePage(e, "create")}
                  leftIcon={<CgPlayListAdd />}
                >
                  Create Ticket
                </Button>
                <Button
                  onClick={(e) => handlePage(e, "view")}
                  leftIcon={<CgViewList />}
                >
                  View Ticket
                </Button>
              </ButtonGroup>
              <Box w="100%" mt="2rem">
                {/* pages shows here */}
                <Box d={page === "home" ? "flex" : "none"}>
                  <TicketHome />
                </Box>
                <Box d={page === "view" ? "block" : "none"}>
                  <TicketList data={tickets} removeData={removeTicket} />
                </Box>
                <Box d={page === "create" ? "flex" : "none"}>
                  <CreateTicket
                    saved={saved}
                    addTicket={addTicket}
                    sending={sending}
                    message={message}
                    error={error}
                    reset={resetProperty}
                  />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </Fragment>
  );
}

export default observer(index);

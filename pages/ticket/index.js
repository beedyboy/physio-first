import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { Flex, Button, Box, ButtonGroup } from "@chakra-ui/react";
import Layout from "../../templates/Private/Layout";
import { useMobxStores } from "../../stores/stores";
import { MdAdd } from "react-icons/md";
import { observer } from "mobx-react-lite";
import TicketHome from "../../Components/Ticket/TicketHome";
import TicketList from "../../Components/Ticket/TicketList";
import CreateTicket from "../../Components/Ticket/CreateTicket";
function index(props) {
  const [page, setPage] = useState("home");
  const { ticketStore } = useMobxStores();
  const {
    addTicket,
    sending,
    saved,
    fetchMyTicket,
    myTickets,
    error,
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
        <Flex direction={["column", "row"]} justifyContent="space-between">
          <Box width="30%"></Box>
          <Box flex="1">
            <Flex direction="column" justifyContent="space-between">
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme="blue"
                  onClick={(e) => handlePage(e, "create")}
                >
                  Create Ticket
                </Button>
                <Button onClick={(e) => handlePage(e, "view")}>
                  View Ticket
                </Button>
              </ButtonGroup>
              <Box w="100%">
                {/* pages shows here */}
                <Box d={page === "Home" ? "flex" : "none"}>
                  <TicketHome />
                </Box>
                <Box d={page === "view" ? "flex" : "none"}>
                  <TicketList data={myTickets} />
                </Box>
                <Box d={page === "create" ? "flex" : "none"}>
                  <CreateTicket
                    saved={saved}
                    addTicket={addTicket}
                    sending={sending}
                    message={message}
                    error={error}
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

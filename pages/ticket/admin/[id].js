import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import PerfectScrollBar from "react-perfect-scrollbar";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Badge,
  Stack,
  Text,
  Wrap,
  WrapItem, 
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../../../stores/stores";
import { MdEdit } from "react-icons/md";
import ModalWidget from "../../../widgets/ModalWidget";
import Status from "../../../Components/AdminTicket/Status";
import Conversation from "../../../Components/Conversation/Conversation";
import Layout from "../../../templates/Private/Layout";
const AdminTicketDetails = (props) => {
  const { query } = props; 
  const { ticketStore } = useMobxStores();
  const { getTicketById, ticket, toggleStatus, sending, error, action, resetProperty } = ticketStore;

  useEffect(() => {
    const { id } = query;
    getTicketById(id);
  }, []);

  const [modal, setModal] = useState({
    status: false,
    assign: false,
  });
  const { assign, status } = modal;

  const toggleModal = (id) => {
    setModal((state) => ({
      ...state,
      [id]: !modal[id],
    }));
  };
  return (
    <>
    <Layout>
      <PerfectScrollBar>
      <Flex
        w="100%"
        direction="column"
        justify="space-between"
        align="space-between"
      >
        {/* do a breadcrumb here */}

        <Flex>
          <Box w="63%">
            {/* conversation here */}
            <Heading mb={2} as="h6">
              Conversation
            </Heading>
            <Box>
              <Conversation id={query.id} respondent="TaskPerson" />
            </Box>
          </Box>
          <Box flex="1" ml={2}>
            <Stack spacing="24px" direction="column">
              <Heading mb={2} as="h6">
                {" "}
                Ticket Information
              </Heading>
              <Box>
                <Text as="p" fontWeight="bolder">
                  Subject
                </Text>
                <Text as="h6"> {ticket && ticket.title}</Text>
              </Box>
              <Box>
                <Text as="p" fontWeight="bolder">
                  Created On
                </Text>
                <Text as="h6"> {ticket && ticket.createdAt}</Text>
              </Box>
              <Box>
                <Text as="p" fontWeight="bolder">
                  Ticket Manager
                </Text>
                <Text as="h6">
                  {" "}
                  {` ${
                    ticket && ticket.assigned_to && ticket.assigned_to.firstname
                  }  ${
                    ticket && ticket.assigned_to && ticket.assigned_to.lastname
                  }`}
                </Text>
              </Box>
              <Box>
                <Text as="p" fontWeight="bolder">
                  Status
                </Text>
                <Wrap spacing="20px">
                  <WrapItem>
                    <Badge>{ticket && ticket.status}</Badge>
                  </WrapItem>
                  <WrapItem>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit Status"
                      fontSize="20px"
                      icon={<MdEdit />}
                      onClick={(e) => toggleModal("status")}
                    />
                  </WrapItem>
                </Wrap>
                <ModalWidget
                  title="Update Status"
                  open={status}
                  id="status"
                  toggle={toggleModal}
                >
                  <Status
                    sending={sending}
                    data={ticket}
                    error={error}
                    toggle={toggleModal}
                    toggleStatus={toggleStatus}
                    action={action}
                    reset={resetProperty}
                  />
                </ModalWidget>
              </Box>
              <Box>
                <PerfectScrollBar>
                  {ReactHtmlParser(ticket.description)}
                </PerfectScrollBar>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Flex>
      </PerfectScrollBar>
         </Layout>
          </>
  );
};
AdminTicketDetails.getInitialProps = async ({ query }) => {
  return { query };
};

export default observer(AdminTicketDetails);

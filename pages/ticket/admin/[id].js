import React, { useState, useEffect } from "react"; 
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, 
  WrapItem,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../../../stores/stores";
import { MdEdit } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import ModalWidget from "../../../widgets/ModalWidget";
import Status from "../../../Components/AdminTicket/Status";
import Conversation from "../../../Components/Conversation/Conversation";
import Layout from "../../../templates/Private/Layout";
import AssignTicket from "../../../Components/AdminTicket/AssignTicket";
import Link from "next/link";
import moment from "moment";

const AdminTicketDetails = (props) => {
  const { query } = props;
  const { ticketStore, userStore } = useMobxStores();
  const {
    getTicketById,
    loading,
    assignManager,
    ticket,
    toggleStatus,
    sending,
    error,
    action,
    resetProperty,
  } = ticketStore;
  const { getUsers, users, loading: userLoading } = userStore;
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
            {loading ? (
              <>
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={6} spacing="4" />
                </Box>
              </>
            ) : (
              <>
                <Breadcrumb
                  spacing="8px"
                  separator={<BiChevronRight color="gray.500" />}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/">
                      <a>Home</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/ticket/admin">
                      <a>Ticket</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                      as={Link}
                      href={`/ticket/admin/${ticket._id}`}
                    >
                      <a>{ticket && ticket.title}</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>

                <Flex>
                  <Box w="63%">
                    <Heading mb={2} as="h6">
                      Conversation
                    </Heading>
                    <Box>
                      <Conversation
                        id={query.id}
                        respondent="TaskPerson"
                        description={(ticket && ticket.description) || ""}
                        tDate={ticket && ticket.createdAt}
                      />
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
                          Category
                        </Text>
                        <Text as="h6"> {ticket && ticket.category}</Text>
                      </Box>
                      <Box>
                        <Text as="p" fontWeight="bolder">
                          Priority
                        </Text>
                        <Text as="h6"> {ticket && ticket.priority}</Text>
                      </Box>
                      <Box>
                        <Text as="p" fontWeight="bolder">
                          Created On 
                        </Text>
                        <Text as="h6"> 
                          {moment(ticket && ticket.createdAt).format(
                            "dddd, MMMM Do YYYY, h:mm:ss a"
                          )}
                        </Text>
                      </Box>
                      <Box>
                        <Text as="p" fontWeight="bolder">
                          Ticket Manager
                        </Text>
                        <Text as="h6">
                          {" "}
                          {` ${
                            ticket &&
                            ticket.assigned_to &&
                            ticket.assigned_to.firstname
                          }  ${
                            ticket &&
                            ticket.assigned_to &&
                            ticket.assigned_to.lastname
                          }`}{" "}
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Assign Manager"
                            fontSize="20px"
                            icon={<MdEdit />}
                            onClick={(e) => toggleModal("assign")}
                          />
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
                        <ModalWidget
                          title="Assign Manager"
                          open={assign}
                          id="assign"
                          toggle={toggleModal}
                        >
                          <AssignTicket
                            assignManager={assignManager}
                            sending={sending}
                            data={ticket}
                            error={error}
                            toggle={toggleModal}
                            action={action}
                            users={users}
                            getUsers={getUsers}
                            loading={userLoading}
                            reset={resetProperty}
                          />
                        </ModalWidget>
                      </Box>
                      {/* <Box>
                        <PerfectScrollBar>
                          {ReactHtmlParser(ticket.description)}
                        </PerfectScrollBar>
                      </Box> */}
                    </Stack>
                  </Box>
                </Flex>
              </>
            )}
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

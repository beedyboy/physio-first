import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Layout from "../../../templates/Private/Layout";
import { useMobxStores } from '../../../stores/stores';
import AdminTicketList from '../../../Components/AdminTicket/AdminTicketList';
import { Flex, Button, Box,  Heading, useDisclosure } from "@chakra-ui/react"; 
import { observer } from "mobx-react-lite";
const index = () => {
    const { ticketStore } = useMobxStores();
    const { removeTicket, assignTicket, fetchTicket, tickets} = ticketStore;
    const [rowData, setRowData] = useState();
    const [mode, setMode] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        fetchTicket();
      }, []);
    
      const apply = () => { 
        onOpen();
      };
    return (
        <Fragment>
            <Head>
        <title>Physio First | Ticket management</title>
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
            <Heading mb={4}> Ticket management</Heading>

            {/* <Button
              leftIcon={<MdAdd />}
              colorScheme="teal"
              p="2rem"
              onClick={apply}
            >
              Apply
            </Button> */}
          </Box>
          <Box>
            <AdminTicketList data={tickets}  setMode={setMode}
            toggle={onOpen}
            removeData={removeTicket}
            rowData={setRowData} />
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
        </Fragment>
    );
};

export default observer(index);
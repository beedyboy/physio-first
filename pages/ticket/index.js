import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { Flex, Button, Box, Heading, useDisclosure } from "@chakra-ui/react";
import Layout from "../../templates/Private/Layout";
import { useMobxStores } from "../../stores/stores";
import { MdAdd } from "react-icons/md";
import { observer } from "mobx-react-lite";
function index(props) {
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
                <Button colorScheme="blue">Create Ticket</Button>
                <Button>View Ticket</Button>
              </ButtonGroup>
              <Box w="100%">
                  {/* pages shows here */}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </Fragment>
  );
}

export default index;

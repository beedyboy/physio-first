import React from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import Help from "../views/system/Help";
import Branch from "../views/system/Branch";
import Category from "../views/system/Category";

function system(props) {
  return (
    <>
      <Head>
        <title>Physio First | System</title>
      </Head>
      <Layout>
        <Tabs>
          <TabList>
            <Tab>Help</Tab>
            <Tab>Branch</Tab>
            <Tab>Category</Tab>
            <Tab isDisabled>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <Branch />
            </TabPanel>
            <TabPanel>
              <Category />
            </TabPanel>
            <TabPanel>3</TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default system;

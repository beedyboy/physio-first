import React from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import Help from "../views/admin/Help";
import Account from "../views/admin/Account";
import Vacation from "../views/admin/Vacation";

function admin(props) {
  return (
    <>
      <Head>
        <title>Physio First | Admin</title>
      </Head>
      <Layout>
        <Tabs>
          <TabList>
            <Tab>Help</Tab>
            <Tab>Staff</Tab>
            <Tab>Vacation</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <Account />
            </TabPanel>
            <TabPanel>
              <Vacation />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default admin;

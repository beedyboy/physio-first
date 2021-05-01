import React from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import Help from "../views/admin/Help";
import Account from "../views/admin/Account";

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
            <Tab>Vacations</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <Account />
            </TabPanel>
            <TabPanel>
              <Account />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default admin;
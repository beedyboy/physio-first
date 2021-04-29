import React from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import Help from "../views/system/Help";
import Branch from "../views/system/Branch";
import Category from "../views/system/Category";
import Department from "../views/system/Department";
import Marketing from "../views/system/Marketing";
import SubCategory from "../views/system/SubCategory";
import Leave from "../views/system/Leave";

function admin(props) {
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
            <Tab>Department</Tab>
            <Tab>Marketing</Tab>
            <Tab>SubCategory</Tab>
            <Tab>Vacation</Tab>
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
            <TabPanel>
              <Department />
            </TabPanel>
            <TabPanel>
              <Marketing />
            </TabPanel>
            <TabPanel>
              <SubCategory />
            </TabPanel>
            <TabPanel>
              <Leave />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default admin;

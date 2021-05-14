import React from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout"; 
import { useMobxStores } from "../stores/stores"; 
import { observer } from "mobx-react-lite";

function onboarding(props) {
  console.log({props})
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
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <Branch />
            </TabPanel> 
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default observer(onboarding);

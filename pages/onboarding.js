import React, { useEffect } from "react";
import Head from "next/head";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Box,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import Layout from "../templates/Private/Layout"; 
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react-lite";
import DirectorCard from "../Components/Director/DirectorCard"; 

function onboarding(props) {
  const { directorStore } = useMobxStores();
  const { loading, directors, fetchDirector } = directorStore;

  useEffect(() => {
    fetchDirector();
  }, []);

  return (
    <>
      <Head>
        <title>Physio First | Onboarding</title>
      </Head>
      <Layout>
        <Tabs>
          <TabList>
            <Tab>Executives</Tab> 
            <Tab>Document</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>
                <Skeleton isLoaded={!loading}>
                    <SimpleGrid columns={[3, null, 4]} spacing="10px">
                  {/* <SimpleGrid minChildWidth="180px" spacing="10px"> */}
                    {directors && directors.length < 1 ? (
                      <Text as="p" fontWeight="bolder">
                        No record found!
                      </Text>
                    ) : (
                      directors &&
                      directors.map((director) => (
                        <DirectorCard data={director} key={director._id} />
                      ))
                    )}
                  </SimpleGrid>
                </Skeleton>
              </Box>
            </TabPanel> 
            <TabPanel>
              Document
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default observer(onboarding);

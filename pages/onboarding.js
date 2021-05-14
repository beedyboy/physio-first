import React, { useEffect } from "react";
import Head from "next/head";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react-lite";
import DirectorCard from "../Components/Director/DirectorCard";
import { DocumentInitialProps } from '../build/server/pages/_document';

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
            <Tab>Directors</Tab>
            <Tab>Document</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>
                <Skeleton isLoaded={!loading}>
                  <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="10px">
                    {directors && directors.length < 1 ? (
                      <Text as="p" fontWeight="bolder">
                        No record found!
                      </Text>
                    ) : (
                      directors &&
                      directors.map((director) => (
                        <DirectorCard data={director} />
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

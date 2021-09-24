import React, { Fragment, useEffect } from "react";
import Head from "next/head";
import Layout from "../templates/Private/Layout";
import {
  Flex,
  Box,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import SickRecord from "../Components/Exeat/SickRecord";
import BereavementRecord from "../Components/Exeat/BereavementRecord";
import ProfileDetails from "../Components/Profile/ProfileDetails";
function profile() {
  const { userStore, exeatStore } = useMobxStores();
  const {
    error,
    action,
    message,
    sending,
    profileLoading,
    errMessage,
    getProfile,
    myProfile,
    updateProfile,
    resetProperty,
  } = userStore;
  const {
    getExeatByType,
    sickHistory,
    bereavementHistory, 
  } = exeatStore;
  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    if (myProfile && toJS(myProfile)._id !== undefined) {
      getExeatByType(myProfile && toJS(myProfile)._id, "Sick", "sickHistory");
      getExeatByType(
        myProfile && toJS(myProfile)._id,
        "Bereavement",
        "bereavementHistory"
      );
    }
  }, [myProfile]);
  useEffect(() => {
    if (error && action === "logout") {
      toast({
        title: "Server Response.",
        description: errMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      resetProperty("profileLoading", false);
      resetProperty("error", false);
      resetProperty("errMessage", "");
      resetProperty("message", "");
      resetProperty("action", "");
    };
  }, [action, error]);
  return (
    <>
      <Head>
        <title>Physio First | Profile</title>
      </Head>
      <Layout>
        <Tabs>
          <TabList>
            <Tab>Profile</Tab>

            <Tab>Sick</Tab>
            <Tab>Bereavement</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex direction="column" w="100%" justifyContent="space-between">
                <Flex direction="row">
                  <Box mb={3}>
                    <Heading>Profile Information</Heading>
                  </Box>
                </Flex>{" "}
                {profileLoading ? (
                  <>
                    <Box padding="6" boxShadow="lg" bg="white">
                      <SkeletonCircle size="10" />
                      <SkeletonText mt="4" noOfLines={6} spacing="4" />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box w="100%">
                      <Fragment>
                        <ProfileDetails
                          data={myProfile}
                          updateProfile={updateProfile}
                          action={action}
                          error={error}
                          message={message}
                          sending={sending}
                          reset={resetProperty}
                        />
                      </Fragment>
                    </Box>
                  </>
                )}
              </Flex>
            </TabPanel>

            <TabPanel>
              <Box d="flex" justifyContent="space-between">
                <Heading mb={4}>Sick Exeat</Heading>
              </Box>
              <Box>
                <SickRecord data={toJS(sickHistory)} user="staff" />
              </Box>
            </TabPanel>

            <TabPanel>
              <Box d="flex" justifyContent="space-between">
                <Heading mb={4}>Bereavement Exeat</Heading>
              </Box>
              <Box>
                <BereavementRecord
                  data={toJS(bereavementHistory)}
                  user="staff"
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default observer(profile);

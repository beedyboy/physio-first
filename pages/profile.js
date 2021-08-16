import React, { Fragment, useEffect } from "react";
import Head from "next/head";
import Layout from "../templates/Private/Layout";
import {
  Flex,
  Box, 
  Heading, 
  SkeletonCircle,
  SkeletonText,
  Tabs, TabList, TabPanels, Tab, TabPanel 
} from "@chakra-ui/react";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react-lite";
import ProfileDetails from "../Components/Profile/ProfileDetails"; 
function profile() {
  const { userStore } = useMobxStores();
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
  useEffect(() => {
    getProfile();
  }, []); 
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
      {/* <Tabs>
          <TabList>
            <Tab>Profile</Tab>
             
                <Tab>Sick Exeat</Tab>
                <Tab>Bereavement Exeat</Tab> 
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel> 
            <TabPanel>
              <Marketing />  
            </TabPanel>
            
          </TabPanels>
        </Tabs> */}

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
      </Layout>
    </>
  );
}

export default observer(profile);

import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../templates/Private/Layout";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react-lite";
import ProfileDetails from "../Components/Profile/ProfileDetails";
import CeoStory from "../Components/Profile/CeoStory";
function profile(props) {
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
  const [page, setPage] = useState(true);
  useEffect(() => {
    getProfile();
  }, []);
  const handlePage = (e) => {
    setPage(!page);
  };
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
        <Flex direction="column" w="100%" justifyContent="space-between">
          <Flex direction="row">
            <Box mb={3}>
              <Heading>{page ? "Profile Information" : "CEO Story"}</Heading>
            </Box>
            <Box mt={3} mx="auto" mr={3} align="right" mb={3}>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Culture book
                </FormLabel>
                <Switch id="page" isChecked={page} onChange={handlePage} />
              </FormControl>
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
                {page ? (
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
                ) : (
                  <CeoStory
                    id={myProfile && myProfile._id}
                    signed={myProfile && myProfile.signed}
                  />
                )}
              </Box>
            </>
          )}
        </Flex>
      </Layout>
    </>
  );
}

export default observer(profile);

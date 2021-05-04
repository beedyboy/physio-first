import React, { Fragment, useEffect } from "react";
import Head from "next/head";
import Layout from "../templates/Private/Layout";
import { Flex, Box, Stack, Heading, Switch } from "@chakra-ui/react";
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
  }, [action, error])
  return (
    <>
      <Head>
        <title>Physio First | Profile</title>
      </Head>
      <Layout>
        <Flex direction="column" w="100%" justifyContent="space-between">
          <Stack direction="row">
            <Box mb={3}>
              <Heading>Profile Information</Heading>
            </Box>
            <Switch id="page" isChecked={page} onChange={handlePage} />
          </Stack>
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
        </Flex>
      </Layout>
    </>
  );
}

export default observer(profile);

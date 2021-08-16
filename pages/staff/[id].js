import React, { useEffect } from "react";
import Head from "next/head";
import PerfectScrollBar from "react-perfect-scrollbar";
import { SkeletonCircle, SkeletonText, Flex, Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../../stores/stores";
import Layout from "../../templates/Private/Layout";
import StaffProfile from "../../Components/Profile/StaffProfile";
const Staff = (props) => {
  const { query } = props;
  const { userStore, exeatStore } = useMobxStores();
  const { getProfileById, profile, profileLoading } = userStore;

  useEffect(() => {
    const { id } = query;
    getProfileById(id);
  }, []);

  return (
    <>
    <Head>
        <title>Physio First | {profile && profile.lastname + " " + profile && profile.firstname}</title>
      </Head>
      <Layout>
        <PerfectScrollBar>
          <Flex
            w="100%"
            direction="column"
            justify="space-between"
            align="space-between"
          >
            {profileLoading ? (
              <>
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={6} spacing="4" />
                </Box>
              </>
            ) : (
              <StaffProfile data={profile} store={exeatStore} />
            )}
          </Flex>
        </PerfectScrollBar>
      </Layout>
    </>
  );
};
Staff.getInitialProps = async ({ query }) => {
  return { query };
};

export default observer(Staff);

import React from "react";
import Head from "next/head";
import {
  Heading, 
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow, 
} from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import { useMobxStores } from "../stores/stores"; 
import { observer } from "mobx-react-lite";

function Dashboard() {

  const { userStore, branchStore, vacationStore } = useMobxStores(); 
  const { stats: totalUser } = userStore;
  const { stats: totalBranch } = branchStore;
  const {
    
    stats: pendingVac,
    getMyApplications,
  } = vacationStore;
  // useEffect(() => {
  //   getLeaves();
  //   getMyApplications();
  // }, []);

  return (
    <>
      <Head>
        <title>Physio First | Dashboard</title>
      </Head>
      <Layout>
        <Box maxW="32rem">
          <Heading mb={4}>System's Statistics</Heading>
        </Box>
        <SimpleGrid minChildWidth="120px" spacing="40px">
          <Box bg="green" height="80px"  boxShadow="base" p="3" rounded="md">
            <Stat>
              <StatLabel>Total branch</StatLabel>
              <StatNumber>{totalBranch || 0}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
          <Box bg="tomato" height="80px"  boxShadow="base" p="3" rounded="md">
            <Stat>
              <StatLabel>Total Assets</StatLabel>
              <StatNumber>3</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
          <Box bg="magenta" height="80px"  boxShadow="base" p="3" rounded="md">
            <Stat>
              <StatLabel>Vacations</StatLabel>
              <StatNumber>{pendingVac || 0}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Pending
              </StatHelpText>
            </Stat>
          </Box>
          
          <Box bg="teal.500" height="80px"  boxShadow="base" p="3" rounded="md">
            <Stat>
              <StatLabel>Total Product</StatLabel>
              <StatNumber>3</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
          <Box bg="purple" height="80px"  boxShadow="base" p="3" rounded="md">
            <Stat>
              <StatLabel>Total user</StatLabel>
              <StatNumber>{totalUser || 0}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
      </Layout>
    </>
  );
}

export default observer(Dashboard);

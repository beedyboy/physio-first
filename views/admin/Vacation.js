import React, { useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Flex,
  Heading,
  useToast,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useMobxStores } from "../../stores/stores"; 

import AcceptedApplications from "../../Components/Vacation/AcceptedApplications";
import PendingApplication from "../../Components/Vacation/PendingApplication";
import CancelledApplication from "../../Components/Vacation/CancelledApplication";
 import NoAccess from "../../widgets/NoAccess";
const Vacation = (props) => {
  const { pageAccess } = props;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [rowData, setRowData] = useState();
  const { vacationStore } = useMobxStores();
  const { 
    message,
    removed, 
    delVacation,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    resetProperty,
    getApplications,
  } = vacationStore;

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    if (removed === true) {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      resetProperty("removed", false);
      resetProperty("message", "");
    };
  }, [removed]); 
  return (
    <Fragment>
      <Flex
        direction="column"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box d="flex" justifyContent="space-between">
          <Heading mb={4}> Vacation Applications</Heading>
        </Box>
        {pageAccess ? (
          <>
            <Box>
              <Tabs>
                <TabList>
                  <Tab>Pending</Tab>
                  <Tab>Accepted</Tab>
                  <Tab>Cancelled</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <PendingApplication
                     payload={pendingApplications}
                     {...props} 
                      removeData={delVacation} 
                    />
                  </TabPanel>
                  <TabPanel>
                    {" "}
                    <AcceptedApplications data={approvedApplications} />
                  </TabPanel>
                  <TabPanel>
                    {" "}
                    <CancelledApplication data={rejectedApplications} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </>
        ) : (
          <NoAccess page="vacation management" />
        )}{" "}
      </Flex>
      
    </Fragment>
  );
};

export default observer(Vacation);

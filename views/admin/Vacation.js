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
import AdminStatusAction from "../../Components/Vacation/AdminStatusAction"; 
const Vacation = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const { vacationStore } = useMobxStores();
  const {
    error,
    saved,
    action,
    message,
    removed,
    sending,
    adminUpdate,
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
                  data={pendingApplications}
                  
                  toggle={onOpen}
                  removeData={delVacation}
                  rowData={setRowData}
                  // setModal={toggleModal}
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
      </Flex>
      <AdminStatusAction  
        open={isOpen}
        action={action}
        saved={saved}
        error={error} 
        message={message}
        sending={sending} 
        handleClose={onClose}
        initial_data={rowData}
        reset={resetProperty} 
        updateApp={adminUpdate} />
    </Fragment>
  );
};

export default observer(Vacation);

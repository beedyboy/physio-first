import React, { useState, useEffect } from "react";
import PerfectScrollBar from "react-perfect-scrollbar";
import {
  Box,
  Flex,
  Heading,
  Badge,
  IconButton,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, 
  Skeleton,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { MdEdit } from "react-icons/md"; 
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { useMobxStores } from "../../../stores/stores";
import Layout from "../../../templates/Private/Layout";
import AdminStatusAction from "../../../Components/Vacation/AdminStatusAction";
import VacationHistory from '../../../Components/Vacation/VacationHistory';
const VacationDetails = (props) => { 
  const { access, query } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { vacationStore } = useMobxStores();

  const leaveAdd = access && access.leave && access.leave.add;
  const {
    getApplicationById,
    getApplicationStat,
    application,
    history,
    error,
    saved, 
    message, 
    adminUpdate,
    loading,
    fetching,
    resetProperty,
    sending,
    action,
  } = vacationStore;
  const [data, setData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    leave_type: "",
    staffId: "",
    createdAt: "",
    status: "",
  });
  useEffect(() => {
    const { id } = query;
    getApplicationById(id);
    // getApplicationStat(id);
  }, []);

  useEffect(() => {
    if (application && application._id !== null) {
      setData((state) => ({
        ...state,
        id: data && application._id,
        firstname: application &&  application.staff && application.staff.firstname,
        lastname: application &&  application.staff && application.staff.lastname,
        staffId: application && application.staff && application.staff._id,
        leaveId: application && application.leave && application.leave._id,
        leave_type: application && application.leave && application.leave.leave_type,
        createdAt: application && application.createdAt,
        status: application && application.status,
      }));
      getHistory();
    }
    return () => {
      setData((prev) => ({
        ...prev,

        id: "",
        firstname: "",
        lastname: "",
        leave_type: "",
        staffId: "",
        createdAt: "",
        status: "",
      }));
    };
  }, [application]);

  const getHistory = () => {
    const histData = {
      leave_type: data.leaveId,
      staff: data.staffId,
    };
    getApplicationStat(histData);
  }

  return (
    <>
      <Layout>
        <PerfectScrollBar>
        <Breadcrumb
                  spacing="8px"
                  separator={<BiChevronRight color="gray.500" />}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/">
                      <a>Home</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/admin">
                      <a>Admin</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                      as={Link}
                      href={`/application/admin/${data.id}`}
                    >
                      <a>{data.leave_type}</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
          <Flex
            w="100%"
            direction="column"
            justify="space-between"
            align="space-between"
          >
            {/* do a breadcrumb here */}

            <Flex>
              <Box w="63%">
                {/* conversation here */}
                <Heading mb={2} as="h6">
                  History
                </Heading>
                <Box>
                  <Skeleton isLoaded={!fetching}>
                    <VacationHistory data={history} />
                  </Skeleton>
                </Box>
              </Box>

              <Box flex="1" ml={2}>
                <Stack spacing="24px" direction="column">
                  <Heading mb={2} as="h6">
                    {" "}
                    Application Information
                  </Heading>
                   <Skeleton isLoaded={!loading}> 
                  <Box>
                    <Text as="p" fontWeight="bolder">
                      Applicant
                    </Text>
                    <Text as="h6">{data.firstname + " " + data.lastname}</Text>
                  </Box>
                  <Box>
                    <Text as="p" fontWeight="bolder">
                      Type
                    </Text>
                    <Text as="h6"> {data && data.leave_type}</Text>
                  </Box>
                  <Box>
                    <Text as="p" fontWeight="bolder">
                      Created On
                    </Text>
                    <Text as="h6"> {data && data.createdAt}</Text>
                  </Box>

                  <Box>
                    <Text as="p" fontWeight="bolder">
                      Status
                    </Text>
                    <Wrap spacing="20px">
                      <WrapItem>
                        <Badge>{data && data.status}</Badge>
                      </WrapItem>
                  {leaveAdd ?  <>  <WrapItem>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Edit Status"
                          fontSize="20px"
                          icon={<MdEdit />}
                          onClick={() => onOpen(true)}
                        />
                      </WrapItem>
                      </>
                      : null}
                    </Wrap>
                    <AdminStatusAction
                      open={isOpen}
                      action={action}
                      saved={saved}
                      error={error}
                      message={message}
                      sending={sending}
                      handleClose={onClose}
                      initial_data={application}
                      reset={resetProperty}
                      updateApp={adminUpdate}
                    />
                  </Box>
                  </Skeleton>
                   </Stack>
              </Box>
            </Flex>
          </Flex>
        </PerfectScrollBar>
      </Layout>
    </>
  );
};
VacationDetails.getInitialProps = async ({ query }) => {
  return { query };
};

export default observer(VacationDetails);

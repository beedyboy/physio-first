import React, { Fragment } from "react";
import { Box, Flex, Center, Heading } from "@chakra-ui/react";
import Menus from "./Components/Menus";
import DesktopNav from "./Components/DesktopNav";

const DesktopLayout = (props) => {
  const { company, pathname, routes, children } = props;
  return (
    <Fragment>
      <Flex>
        {/* <Box w="250px" h="100%" top="0" bottom="0" as="aside" bg="tomato"> */}
        <Box
          as="nav"
          aria-label="Main Navigation"
          pos="sticky"
          top="0rem"
          w="220px"
          h="100vh"
          pr="8" 
          overflowY="auto"
          className="sidebar-content"
          flexShrink={0}
          backgroundColor="brand.white"
        >
          <Center>
            <Heading as="h3" mb={4} color="nav.50">{company}</Heading>
          </Center>
         <Box  d="flex" justifyContent="space-around" mt={10}>
         <Menus routes={routes} company={company} />
         </Box>
        </Box>
        <Flex flex="1" direction="column" as="section">
          <Box bg="nav.50" d="flex" w="100%">
            <DesktopNav pathname={pathname} />
          </Box>
          <Box pt="28px" pb="32px" mt="5px">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DesktopLayout;

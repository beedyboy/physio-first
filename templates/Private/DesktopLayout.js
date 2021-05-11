import React, { Fragment } from "react";
import { Box, Flex, Center, Heading, Container, Divider } from "@chakra-ui/react";
import Menus from "./Components/Menus";
import DesktopNav from "./Components/DesktopNav";

const DesktopLayout = (props) => {
  const { company, pathname, user, routes, children, acl } = props;
  return (
    <Fragment>
      <Flex w="100%">
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
            <Heading as="h3" mb={4} color="nav.50" mt={3}>
              {company}
            </Heading>
          </Center>

          <Divider colorScheme="blackAlpha" />
          <Box d="flex" justifyContent="space-around" mt={8}>
            <Menus routes={routes} company={company} />
          </Box>
        </Box>
        <Flex flex="1" direction="column" as="section">
          <Box bg="nav.50" d="flex" w="100%">
            <DesktopNav user={user} pathname={pathname} />
          </Box>
          <Box pt="28px" pb="32px" mt="5px"  w="100%">
            <Container  maxW="container.xl">{children}</Container>
            </Box>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DesktopLayout;

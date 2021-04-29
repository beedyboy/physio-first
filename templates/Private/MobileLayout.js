import React, { Fragment } from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import Menus from "./Components/Menus";
import MobileNav from "./Components/MobileNav";

const MobileLayout = (props) => {
  const { company, routes, isOpen, onOpen, onClose, children } = props;
  return (
    <Fragment>
      <MobileNav
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        company={company}
      />
      <Flex direction="column">
        <Box w="100px"></Box>
        <Box flex="1" as="section" px="1.2rem" pt="48px" pb="32px">
          <Container maxW="container.xl">{children}</Container>
        </Box>
      </Flex>
      <Box
        maxWidth="800px"
        px="1.2rem"
        pt="2rem"
        position="fixed"
        height="100vh"
        zIndex="9999"
        top="6rem"
        width="100%"
        backgroundColor="brand.white"
        display={isOpen ? "block" : "none"}
      >
        <Menus routes={routes} />
      </Box>
    </Fragment>
  );
};

export default MobileLayout;

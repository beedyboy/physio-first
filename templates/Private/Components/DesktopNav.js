import React, { Fragment } from "react";
import { Box, Flex, Avatar, Heading } from "@chakra-ui/react";

const DesktopNav = (props) => {
  const { pathname } = props;
  return (
    <Fragment>
      <Flex w="100%" h="90px" align="center" justifyContent="space-between">
        <Box>
          <Heading ml={1} mb={4}>{pathname}</Heading>
        </Box>
        <Avatar size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      </Flex>
    </Fragment>
  );
};

export default DesktopNav;

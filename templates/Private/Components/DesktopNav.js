import React, { Fragment } from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import Utility from "../../../services/UtilityService";

const DesktopNav = (props) => {
  const { pathname, user } = props; 
  return (
    <Fragment>
      <Flex w="100%" h="60px" align="center" justifyContent="space-between">
        <Box>
          <Heading color="white" ml={1} mb={4}>
            {pathname}
          </Heading>
        </Box>
        <Menu>
          <MenuButton
            as={Avatar}
            size="md"
            name={user}
            src="https://bit.ly/dan-abramov"
            rightIcon={<ChevronDownIcon />}
          ></MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={() => Utility.logout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Fragment>
  );
};

export default DesktopNav;

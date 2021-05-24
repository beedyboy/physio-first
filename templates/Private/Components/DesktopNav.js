import React, { Fragment } from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Utility from "../../../services/UtilityService";
// import { BiDownArrow } from "react-icons/bi";

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
        <Menu cursor="pointer" mr={2}>
          <MenuButton
            as={Avatar} 
            size="md"
            name={user}
            src="https://youarecaptured.org/dan-abramov" 
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

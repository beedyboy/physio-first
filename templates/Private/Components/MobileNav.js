import React, { Fragment } from "react";
import {
  Box,
  Flex,
  Avatar, 
  Link,
  IconButton,
  CloseButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Utility from "../../../services/UtilityService";

const MobileNav = (props) => {
  const { company, user, isOpen, onOpen, onClose } = props;
  return (
    <Fragment>
      <Box d="flex" w="100%" bg="nav.50">
        <Flex w="100%" justifyContent="space-between">
          <Box>
            {isOpen ? (
              <CloseButton  onClick={onClose} />
            ) : (
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                onClick={onOpen}
                icon={<AiOutlineMenu />}
                {...props}
              />
            )}
          </Box>
          <Box>{company}</Box>
          <Menu>
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
      </Box>
    </Fragment>
  );
};

export default MobileNav;

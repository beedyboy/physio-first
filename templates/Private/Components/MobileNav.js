import React, { Fragment } from "react";
import {
  Box,
  Flex,
  Avatar, 
  IconButton,
  CloseButton,
  useColorModeValue,
  
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

const MobileNav = (props) => {
  const { company, isOpen, onOpen, onClose } = props;
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
          <Avatar
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
        </Flex>
      </Box>
    </Fragment>
  );
};

export default MobileNav;

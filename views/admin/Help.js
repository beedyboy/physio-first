import React from "react"; 
import { Heading, Box, Text,  List, ListItem, ListIcon, } from "@chakra-ui/react" 
import { MdCheckCircle } from "react-icons/md"

function Help() {
	return (
		<>
		 
<Box maxW="32rem">
  <Heading mb={4}>How?</Heading>
  <Text fontSize="xl">
  What does this route allows for?
  </Text>
  <List mt={2} spacing={3}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color="green.500" />
   Manage users' account
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color="green.500" />
    Manage Vacations (Accept | Decline | view)
  </ListItem>
  
</List>
</Box> 
		</>
	);
}

export default Help;

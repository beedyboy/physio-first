import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import Link from "next/link";

const TicketHome = () => {
  return (
    <>
      <Box boxShadow="base" p="6" rounded="md" bg="white">
       <Text as="p">Your satisfaction is our joy</Text>
        <Divider my={2} />
       <Text>
          If you have any issue with any of our products and services, you can
          submit a ticket by selecting the appropriate category.
       </Text>
       <Text as="p">
          <Link href="/ticket/create">
            <a>Create Ticket</a>
          </Link>
       </Text>
      </Box>
    </>
  );
};

export default TicketHome;

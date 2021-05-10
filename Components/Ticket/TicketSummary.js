import React, { Fragment, memo } from "react";
import { Badge, Box, Divider, Text } from "@chakra-ui/react";
import Link from "next/link";

const TicketSummary = memo(({ row }) => {
  return (
    <Fragment>
      <Box my={1}>
        <Text as="span" className="text-muted">
          {" "}
          #{row._id}
        </Text>
        <Link href={`/ticket/${row._id}`}>
          <a> {row.title}</a>
        </Link>
        <Divider />
        <Text as="span">
          <Badge>{row.status}</Badge>{" "}
        </Text>{" "}
        <Text as="span" align="right">
          {row.createdAt}
        </Text>
      </Box>
    </Fragment>
  );
});

export default TicketSummary;

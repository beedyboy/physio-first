import React, { Fragment } from "react";
import { Box } from "@chakra-ui/react";

const PLayout = (props) => {
  return (
    <Fragment>
      <Box w="100%">{props.children}</Box>
    </Fragment>
  );
};

export default PLayout;

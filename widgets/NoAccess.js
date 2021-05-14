import React, { Fragment } from 'react';
import { Heading, Box, Flex } from "@chakra-ui/react";

const NoAccess = (props) => {
   const { page } = props;
    return (
        <Fragment>
            <Flex justifyContent="space-between" align="space-between">
                <Box>
                <Heading mb={4}>
                    
                    {`You do not have access to ${page} Page`}

                </Heading>

                </Box>
            </Flex>
        </Fragment>
    );
};

export default NoAccess;
import React from "react";
import {
  Box, 
  Stack, 
} from "@chakra-ui/react";
import Iframe from 'react-iframe' 

const CEOSTORY = () => { 
 
  return (
    <>
      <Stack
        direction="column"
        spacing="24px"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box> 
          <Iframe url="/assets/docs/Ceo_story_word.pdf"
         height="500px"
         width="100%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
        </Box>
 </Stack>
    </>
  );
};
export default CEOSTORY;

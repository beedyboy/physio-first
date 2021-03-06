import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Text, Stack, Center, Image } from "@chakra-ui/react";

const DirectorCard = ({ data }) => {
  // let images = JSON.parse(data.images);
  return (
    <Fragment>
      <Stack
        mt="5px"
        mb="2rem"
        height="230px"
        backgroundColor="white"
        // w={["40%", 300, "40%"]} 
        // w="200px"
        borderWidth="1px"
        borderRadius="lg"
        // overflow="hidden"
        spacing="10px"
        direction="column"
      >
       <Box className="img-container">
          {/* <Image top
                  // width="100%"
                  // borderRadius="full"
            src={data.images[0]}
            //  boxSize="150px"
            // objectFit="cover"
            className="img-resize" 
             alt={data._id}
          /> */}
          <img   
            src={data.images[0]} 
            className="img-resize" 
            // width="200" height="180" 
            alt={data._id}
          />
        </Box>
        <Box bg="teal" style={{ height: "40px", maxHeight: "40px", width: "100%", color: 'white' }}>
          <Center>
          <Text>
            {data.lastname + " " + data.firstname}
            <br />
            <span style={{ paddingLeft: "5px", fontSize: "11px" }}>
              ({data.position || "N/A"}){" "}
            </span>
          </Text>
            </Center>
         
        </Box>
      </Stack>
      {/* <Stack
        mt="5px"
        mb="2rem"
        height="300px"
        backgroundColor="white"
        w={[250, 300, 400]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        spacing="24px"
        direction="column"
      >
        <Box className="lt-cardBody">
          <Box className="flip-card">
            <Box className="flip-content">
              <Box className="flip-front">
                <Image
                  top
                  width="100%"
                  style={{ height: "280px", maxHeight: "280px", width: "100%" }}
                  src={data.images[0]}
                  alt={data._id}
                />
              </Box>
              <Box className="flip-back">
                <Text style={{ paddingLeft: "30px" }}>
                  {data.lastname + " " + data.firstname}
                  <br />
                  <span style={{ paddingLeft: "25px", fontSize: "11px" }}>
                    {" "}
                    ({data.position || "N/A"}){" "}
                  </span>
                </Text>

                <Box className="card-text">
                  <PerfectScrollbar>
                    <>{ReactHtmlParser(data && data.story)}</>
                  </PerfectScrollbar>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack> */}
    </Fragment>
  );
};

export default DirectorCard;

import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import PerfectScrollbar from "react-perfect-scrollbar"; 
import {  Box, Text, Stack, Image } from "@chakra-ui/react"; 

const DirectorCard = ({ data}) => {
  
let images = JSON.parse(data.images)
  return (
    <Fragment>
      <Stack spacing="24px" director="column">
        <Box className="lt-cardBody">
          <Box className="flip-card">
            <Box className="flip-content">
              <Box className="flip-front">
                <Image
                  top
                  width="100%"
                  style={{ height: "280px", maxHeight: "280px", width: "100%" }}
                  src={images[0]}
                  alt={data._id}
                />
              </Box>
              <Box className="flip-back">
                <Text style={{ paddingLeft: "30px" }}>
                  {data.lastname + " " + data.firstname}
                  <br />
                  <span style={{ paddingLeft: "25px", fontSize: "11px" }}>
                    {" "}
                    ({data.position || "not available"}){" "}
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
      </Stack>
        </Fragment>
  );
};

export default DirectorCard;

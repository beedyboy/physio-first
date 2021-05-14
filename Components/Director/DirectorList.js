import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import PerfectScrollbar from "react-perfect-scrollbar"; 
import { IconButton, Box, Text, Stack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";

const DirectorList = ({ data, setMode, removeData, rowData, toggle }) => {
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const deleteData = (id) => {
    removeData(id);
  };
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
                  alt={data.id}
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
      <Wrap spacing="20px">
          <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Edit director"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={(e) => editData(e, data)}
            />
          </WrapItem>
          <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Edit director"
              fontSize="20px"
              icon={<MdDelete />}
              onClick={(key) => {
                if (window.confirm("Delete this director?")) {
                  deleteData(data._id);
                }
              }}
            />
          </WrapItem>
        </Wrap>
    </Fragment>
  );
};

export default DirectorList;

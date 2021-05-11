import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import { Button, Box, Text, Wrap, WrapItem, Image } from "@chakra-ui/react";

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

  return (
    <Fragment>
       <Card>                     
               <CardBody className="lt-cardBody">
                   <Box className="flip-card">
                   <Box className="flip-content">
                <Box className="flip-front">
               
                    <Image top width="100%" style={{height: '280px', maxHeight: '280px', width: '100%'}} src={data.images}
                alt={data.id} />  

                </Box> 
                <Box className="flip-back">  
                    <CardTitle style={{paddingLeft: '30px'}}>
                       {data.lastname + " " + data.firstname}
                       <br />
                     <span style={{paddingLeft: '25px', fontSize: '11px'}}>  ({data.position || "not available"}) </span>
                       </CardTitle>
                
                    <Box className="card-text">
                      
                    <PerfectScrollbar>
                    <> 
                    {ReactHtmlParser(data && data.story)}
                    </> 
                    </PerfectScrollbar>
                        
                    </Box>  
                </Box>
               </Box>
                   </Box>
                   <Button
                size="sm"
                color="warning"
                onClick={(e) => editData(e, data)}
              >
                <i className="fa fa-edit"></i>Edit
              </Button>{" "}
              <Button
                size="sm"
                color="danger"
                onClick={(e) => {
                  if (window.confirm("Delete this director?")) {
                    deleteData(e, data.id);
                  }
                }}
              >
                <i className="fa fa-trash"></i> Delete
              </Button>
                   
               </CardBody>
                </Card>
     
    </Fragment>
  );
};

export default DirectorList;

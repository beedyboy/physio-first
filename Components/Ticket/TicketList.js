import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Badge, IconButton, Wrap, WrapItem  } from "@chakra-ui/react";
import Link from "next/link"; 
import { MdDelete } from "react-icons/md";

const TicketList = ({data, removeData}) => { 
 
  const columns = [
    {
      name: "Subject", 
      sortable: true,
      cell: (row) => {
        <Link href={`/ticket/${row.id}`}>
           <a> {row.title}</a>
          </Link>
      }
    },
    {
      name: "Ticket date",
      selector: "ticket_date",
      sortable: true,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => <Badge>{row.status}</Badge>,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Fragment>
          
          <Wrap spacing="20px">
        
         <WrapItem>
             <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Delete ticket"
            fontSize="20px"
            icon={<MdDelete />}
            onClick={(key) => {
              if (window.confirm("Delete this ticket?")) {
                deleteData(row._id);
              }
            }}
          />
           </WrapItem> 

        
        </Wrap>
        </Fragment>
      ),
    },
  ];
  const deleteData = (id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <DataTable
        title="My Tickets"
        columns={columns}
        data={data}
        pagination={true}
        theme="solarized"
      />
    </Fragment>
  );
};

export default TicketList;

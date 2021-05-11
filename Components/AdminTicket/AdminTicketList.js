import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Badge, IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import { CgAssign } from "react-icons/cg";

const AdminTicketList = ({ data, setMode, rowData, toggle }) => {
  const columns = [
    {
      name: "Subject", 
      sortable: true,
      cell: (row) => (
        <Link href={`/ticket/admin/${row._id}`}>
           <a> {row.title}</a>
          </Link>
      )
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Ticket date",
      selector: "ticket_date",
      sortable: true,
    },
    {
      name: "Requester",
      selector: "requester",
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
        <>
          <Wrap spacing="20px">
            <WrapItem>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Assign Ticket"
                fontSize="20px"
                icon={<CgAssign />}
                onClick={(e) => editData(e, row)}
              />
            </WrapItem>
          </Wrap>
        </>
      ),
    },
  ];
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle();
  }; 

  return (
    <Fragment>
      <DataTable
        title="Ticket List"
        columns={columns}
        data={data}
        pagination={true}
        theme="solarized"
      />
    </Fragment>
  );
};

export default AdminTicketList;

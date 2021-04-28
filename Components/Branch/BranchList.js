import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import { MdEdit, MdDelete } from "react-icons/md";

const BranchList = ({ data, setMode, removeData, rowData, toggle }) => {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      wrap: true,
      sortable: true,
      hidden: "sm",
    },
    {
      name: "Created",
      selector: "createdAt",
      sortable: true,
      right: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Wrap spacing="20px">
         <WrapItem>
         <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Edit Branch"
            fontSize="20px"
            icon={<MdEdit />}
            onClick={(e) => editData(e, row)}
          />
           </WrapItem> 
         <WrapItem>
             <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Edit Branch"
            fontSize="20px"
            icon={<MdDelete />}
            onClick={(key) => {
              if (window.confirm("Delete this branch?")) {
                deleteData(row._id);
              }
            }}
          />
           </WrapItem> 

        
        </Wrap>
      ),
    },
  ];
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
      <PerfectScrollBar>
        <DataTable
          title="Branch List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default BranchList;

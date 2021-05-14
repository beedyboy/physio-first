import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Wrap, WrapItem, Text, Image } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import { MdEdit, MdDelete } from "react-icons/md";

const DocumentList = ({ data, setMode, removeData, rowData, toggle }) => {
  const columns = [
    {
      name: "Document Name",
      selector: "title",
      sortable: true,
    },
    {
      name: "Doc Type",
      selector: "doc_type",
      sortable: true,
    },  
    {
      name: "Created",
      selector: "createdAt",
      sortable: true, 
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
              aria-label="Edit Document"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={(e) => editData(e, row)}
            />
          </WrapItem>
          <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Edit Document"
              fontSize="20px"
              icon={<MdDelete />}
              onClick={(key) => {
                if (window.confirm("Delete this Document?")) {
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
          title="Document List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default DocumentList;

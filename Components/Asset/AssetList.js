import React, { Fragment } from "react";
import DataTable from "react-data-table-component"; 
import PerfectScrollBar from "react-perfect-scrollbar"; 
import { MdEdit, MdDelete } from "react-icons/md"; 
import { IconButton, Wrap, WrapItem } from "@chakra-ui/react";
const AssetList = ({
  data,
  setMode, 
  removeData,
  rowData,
  toggle,
}) => {
  const columns = [
    {
      name: "Name",
      selector: "title",
      sortable: true,
    },
    {
      name: "Serial",
      selector: "serial",
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: "sub_id.sub_name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "purchased_date",
      sortable: true,
    },
    {
      name: "Price",
      selector: "purchased_price",
      sortable: true,
    },
    {
      name: "Condition",
      selector: "condition",
      sortable: true,
    },
    {
      name: "Created",
      selector: "createdAt",
      sortable: true,
      hide: "md",
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
              aria-label="Edit Asset"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={(e) => editData(e, row)}
            />
          </WrapItem>
          <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Delete Asset"
              fontSize="20px"
              icon={<MdDelete />}
              onClick={(key) => {
                if (window.confirm("Delete this asset?")) {
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
          title="Asset List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default AssetList;

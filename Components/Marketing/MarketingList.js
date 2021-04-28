import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import { MdEdit, MdDelete } from "react-icons/md";

const MarketingList = ({ data, setMode, removeData, rowData, toggle }) => {
  const columns = [
    {
      name: "Link",
      selector: "url_link",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
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
              aria-label="Edit Marketing"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={(e) => editData(e, row)}
            />
          </WrapItem>
          <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Edit Marketing"
              fontSize="20px"
              icon={<MdDelete />}
              onClick={(key) => {
                if (window.confirm("Delete this category?")) {
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
          title="Marketing List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default MarketingList;

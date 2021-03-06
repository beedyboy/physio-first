import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import { MdEdit, MdDelete } from "react-icons/md";

const SubCategoryList = ({
  canDel,
  canAdd,
  data,
  setMode,
  removeData,
  rowData,
  toggle,
}) => {
  const columns = [
    {
      name: "Name",
      selector: "sub_name",
      sortable: true,
    },
    {
      name: "Category",
      selector: "cat_id.name",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
      sortable: true,
      hidden: "md",
    },
    {
      name: "Created",
      selector: "createdAt",
      sortable: true,
      hidden: "md",
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Wrap spacing="20px">
          {canAdd ? (
            <>
              <WrapItem>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Edit Sub-Category"
                  fontSize="20px"
                  icon={<MdEdit />}
                  onClick={(e) => editData(e, row)}
                />
              </WrapItem>
            </>
          ) : (
            ""
          )}
          {canDel ? (
            <>
              <WrapItem>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Edit Sub-Category"
                  fontSize="20px"
                  icon={<MdDelete />}
                  onClick={(key) => {
                    if (window.confirm("Delete this Sub-Category?")) {
                      deleteData(row._id);
                    }
                  }}
                />
              </WrapItem>
            </>
          ) : (
            ""
          )}
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
          title="SubCategory List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default SubCategoryList;

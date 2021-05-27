import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Wrap, WrapItem, Text, Image } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import { MdEdit, MdDelete } from "react-icons/md";

const DirectorList = ({ data,
  canDel,
  canAdd, setMode, removeData, rowData, toggle }) => {
  const columns = [
    {
      name: "Image", 
      sortable: true,
      cell: (row) => (
       <Image  src={row.images[0]}
       alt={row._id} />
      )
    },
    {
      name: "Fullname", 
      sortable: true,
      cell: (row) => (
       <Text>{row.lastname + " "+ row.firstname}</Text>
      )
    },
    {
      name: "Position",
      selector: "position",
      sortable: true,
    },
    {
      name: "Date joined",
      selector: "date_joined",
      sortable: true, 
      hidden: "md",
    }, 
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Wrap spacing="20px">
           {canAdd ? (
            <> <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Edit Director"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={(e) => editData(e, row)}
            />
          </WrapItem>  </>
          ) : null}
          {canDel ? (
            <>
          <WrapItem>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Edit Director"
              fontSize="20px"
              icon={<MdDelete />}
              onClick={(key) => {
                if (window.confirm("Delete this Director?")) {
                  deleteData(row._id);
                }
              }}
            />
          </WrapItem>
            </>
          ) : null}
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
          title="Director List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default DirectorList;

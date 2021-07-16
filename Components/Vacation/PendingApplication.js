import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar";
import { IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";

const PendingApplication = ({
  data,
  canDel, 
  removeData, 
}) => {
  const columns = [
    {
      name: "Type", 
      sortable: true,
      cell: (row) => 
        (<Fragment>{
          row.leave && row.leave.leave_type ?
         <Fragment>
         <Link href={`/admin/vacation/${row._id}`}>
         <a> {row.leave && row.leave.leave_type}</a>
        </Link>
         </Fragment>
         :
         'N/A'
        }
        </Fragment>) 
    }, 
    {
      name: "Fullname",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link href={`/staff/${row._id}`}>
          <a> {row.staff && row.staff.firstname + " " + row.staff && row.staff.lastname}</a>
          </Link>
        </Fragment>
      ),
    },
    {
      name: "Start date",
      selector: "leave_start_date",
      sortable: true,
    },
    {
      name: "End date",
      selector: "leave_end_date",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Wrap spacing="20px">
           
          {canDel ? (
            <>
              <WrapItem>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Delete Vacation"
                  fontSize="20px"
                  icon={<MdDelete />}
                  onClick={(key) => {
                    if (window.confirm("Delete this Vacation?")) {
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
  
  const deleteData = (id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <PerfectScrollBar>
        <DataTable
          title="Pending List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default PendingApplication;

import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar"; 
import Link from "next/link";

const AcceptedApplications = ({ data }) => {
  const columns = [  
     {
      name: "Type", 
      sortable: true,
      cell: (row) => (
        <Fragment>
          {(row.leave && row.leave.leave_type) || 'N/A' } 
          </Fragment>
      ),
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
  ];
   

  return (
    <Fragment>
      <PerfectScrollBar>
        <DataTable
          title="Accepted List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default AcceptedApplications;

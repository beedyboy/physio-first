import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar"; 

const VacationHistory = ({ data }) => {
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
      name: "Days",
      selector: "days",
      sortable: true,
    }, 
    {
      name: "Status",
      selector: "status",
      wrap: true,
      sortable: true, 
    },  
  ];
   

  return (
    <Fragment>
      <PerfectScrollBar>
        <DataTable
          // title="My Vacations"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default VacationHistory;

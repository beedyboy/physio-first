import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar"; 
import Link from "next/link";
// import { toJS } from "mobx";
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react"
const AcceptedApplications = ({ data: payload }) => {

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  let data = [];
  if (typeof payload !== 'undefined') {
    data = JSON.parse(payload);
  }
  const columns = [  
    {
      name: "Type", 
      sortable: true,
      cell: (row) => 
        (<Fragment>{
          row?.leave?.leave_type ?
         <Fragment>
         <Link href={`/admin/vacation/${row._id}`}>
         <a> {row?.leave?.leave_type}</a>
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
          <Link href={`/staff/${row.staff?._id}`}>
            <a> {row?.staff?.firstname + " " + row?.staff?.lastname}</a>
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
   
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
     <InputGroup w="200px">
  <Input
    // pr="4.5rem"
    type="text"
    placeholder="Filter By firstname, lastname"
    aria-label="Search Input"
    value={filterText}
    onChange={onFilter}
  />
  <InputRightElement width="4.5rem">
    <Button h="1.75rem" size="sm" onClick={onClear}>
      X
    </Button>
  </InputRightElement>
</InputGroup>
    </>
  ); 

  const filteredItems =
    data &&
    data.filter(
      (item) =>
      (   item?.staff?.firstname.toLowerCase().includes(filterText.toLowerCase())) || (item &&
        item?.staff?.lastname.toLowerCase().includes(filterText.toLowerCase())) || item.days === filterText
    );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    }; 
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // console.log(toJS(filteredItems));
  

  return (
    <Fragment>
      <PerfectScrollBar>
        <DataTable
          title="Accepted List"
          columns={columns}
          data={filteredItems}
          pagination={true}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default AcceptedApplications;

import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar";   
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react"
const SickRecord = ({ data: payload, setMode,   rowData, toggle  }) => {

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  let data = JSON.parse(payload);
  const columns = [  
    {
      name: "Type", 
      sortable: true,
      selector: "leave",
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
        <IconButton
        variant="outline"
        colorScheme="teal"
        aria-label="Edit Data"
        fontSize="20px"
        icon={<MdEdit />}
        onClick={(e) => editData(e, row)}
      />
      ),
    },
  ];
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
     <InputGroup w="200px">
  <Input
    // pr="4.5rem"
    type="text"
    placeholder="Filter By date"
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
  item.days === filterText
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
          title="Sick Exeat Record"
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

export default SickRecord;

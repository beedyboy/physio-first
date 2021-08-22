import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar";
import { MdEdit } from "react-icons/md";
import {
  Input,
  InputGroup,
  Button,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
const BereavementRecord = ({ data, user, setMode, rowData, toggle }) => { 
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const columns = [
    {
      name: "days",
      sortable: true,
      selector: "days",
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
      omit: user === "admin" ? false : true,
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
          type="text"
          placeholder="Filter By days"
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
    data.filter((item) =>
    item.days.toString().toLowerCase().includes(filterText.toLowerCase()) ||  item.leave_start_date.toString().toLowerCase().includes(filterText.toLowerCase())
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
  return (
    <Fragment>
      <PerfectScrollBar>
        <DataTable
          title="Bereavement Record"
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

export default BereavementRecord;

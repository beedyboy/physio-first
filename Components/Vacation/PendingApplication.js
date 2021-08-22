import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import PerfectScrollBar from "react-perfect-scrollbar";
import { IconButton, Wrap, WrapItem, Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import styled from "styled-components"; 
  const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
      cursor: pointer;
    }
  `;

  const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
const PendingApplication = ({ payload, canDel, removeData }) => {  
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  let data = JSON.parse(payload);
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By fullname"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </>
  ); 

  const filteredItems =
    data &&
    data.filter(
      (item) =>
      (item &&
        item.staff &&
        item.staff.firstname.toLowerCase().includes(filterText.toLowerCase())) || (item &&
        item.staff &&
        item.staff.lastname.toLowerCase().includes(filterText.toLowerCase())) || item.days === filterText
    );

  const columns = [
    {
      name: "Type",
      sortable: true,
      cell: (row) => (
        <Fragment>
          {row.leave && row.leave.leave_type ? (
            <Fragment>
              <Link href={`/admin/vacation/${row._id}`}>
                <a> {row.leave && row.leave.leave_type}</a>
              </Link>
            </Fragment>
          ) : (
            "N/A"
          )}
        </Fragment>
      ),
    },
    {
      name: "Fullname",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link href={`/staff/${row.staff && row.staff._id}`}>
            <a>
              {" "}
              {row.staff &&
                row.staff.firstname + " " + row.staff &&
                row.staff.lastname}
            </a>
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
 
    
  // const bd = payload
  return (
    <Fragment>
      <PerfectScrollBar> 
        <DataTable
          title="Pending List"
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

export default PendingApplication;

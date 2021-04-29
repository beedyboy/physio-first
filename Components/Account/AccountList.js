import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Wrap, WrapItem,   Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";

const AccountList = ({ data, setMode, removeData, rowData, toggle }) => {
  const columns = [
    {
      name: "Fullname",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link to={`/staff/${row.id}/view`}>
            {row.firstname + " " + row.lastname}
          </Link>
        </Fragment>
      ),
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Staff ID",
      selector: "staffId",
      sortable: true,
    },
    {
      name: "Phone",
      selector: "phone_number",
      sortable: true,
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
        <Menu>
  <MenuButton
    as={IconButton}
    aria-label="Options"
    icon={<HamburgerIcon />}
    variant="outline"
  />
  <MenuList>
    <MenuItem icon={<AddIcon />} command="⌘T">
      New Tab
    </MenuItem>
    <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
      New Window
    </MenuItem>
    <MenuItem  onClick={(e) => editData(e, row)} icon={<MdEdit />} command="⌘E">
     Edit
    </MenuItem>
    <MenuItem icon={<MdDelete />} command="⌘⇧D"  onClick={(key) => {
                if (window.confirm("Delete this Account?")) {
                  deleteData(row._id);
                }
              }}>
    Delete
    </MenuItem>
  </MenuList>
</Menu>
        // <Wrap spacing="20px">
        //   <WrapItem>
        //     <IconButton
        //       variant="outline"
        //       colorScheme="teal"
        //       aria-label="Edit Account"
        //       fontSize="20px"
        //       icon={<MdEdit />}
        //       onClick={(e) => editData(e, row)}
        //     />
        //   </WrapItem>
        //   <WrapItem>
            // <IconButton
            //   variant="outline"
            //   colorScheme="teal"
            //   aria-label="Edit Account"
            //   fontSize="20px"
            //   icon={<MdDelete />}
              // onClick={(key) => {
              //   if (window.confirm("Delete this Account?")) {
              //     deleteData(row._id);
              //   }
              // }}
            // />
        //   </WrapItem>
        // </Wrap>
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
          title="Account List"
          columns={columns}
          data={data}
          pagination={true}
          theme="solarized"
        />
      </PerfectScrollBar>
    </Fragment>
  );
};

export default AccountList;

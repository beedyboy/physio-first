import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import PerfectScrollBar from "react-perfect-scrollbar";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";
import { GrTasks, GrIntegration } from "react-icons/gr";
import { GiKeyLock } from "react-icons/gi";
import { CgLogIn } from "react-icons/cg";

const AccountList = ({
  data,
  setMode,
  setModal,
  removeData,
  rowData,
  toggle,
  canDel,
  canModify,
}) => {
  const columns = [
    {
      name: "Fullname",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link href={`/staff/${row._id}`}>
            <a> {row?.firstname + " " + row?.lastname}</a>
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
      hide: "md",
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Menu h="60" placement="right">
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
              // rightIcon={<GrTasks />}
              variant="outline"
            >
              Set <GrTasks />
            </MenuButton>

            <MenuList>
              {canModify ? (
                <>
                  <MenuItem
                    onClick={(e) => setActionData(e, row, "role")}
                    icon={<GiKeyLock />}
                  >
                    Set Role
                  </MenuItem>
                  {row.can_login ? null : (
                    <MenuItem
                      onClick={(e) => setActionData(e, row, "login")}
                      icon={<CgLogIn />}
                    >
                      Set Login
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={(e) => setActionData(e, row, "onboard")}
                    icon={<GrIntegration />}
                  >
                    Onboard
                  </MenuItem>
                  <MenuItem onClick={(e) => editData(e, row)} icon={<MdEdit />}>
                    Edit
                  </MenuItem>
                </>
              ) : null}
              {canDel ? (
                <MenuItem
                  icon={<MdDelete />}
                  onClick={() => {
                    if (window.confirm("Delete this Account?")) {
                      deleteData(row._id);
                    }
                  }}
                >
                  Delete
                </MenuItem>
              ) : null}
            </MenuList>
          </Menu>
        </Fragment>
      ),
    },
  ];
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const setActionData = (e, row, action) => {
    e.persist();
    rowData(row);
    setModal(action);
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

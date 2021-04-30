import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Select,
  useToast,
  Textarea,
  Wrap,
  WrapItem,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { toJS } from "mobx";

const ACL = ({
  reset,
  saved,
  error,
  exist,
  sending,
  message,
  assignRole,
  toggle,
  initial_data,
}) => {
  const [id, setId] = useState();
  const [priviledges, setPriviledges] = useState({
    asset: { add: false, view: false, del: false, modify: false },
    branch: { add: false, view: false, del: false },
    category: { add: false, view: false, del: false },
    company: { manage: false },
    department: { add: false, view: false, del: false },
    leave: { add: false, view: false, del: false },
    pos: { sell: false, view: false, modify: false },
    product: { add: false, view: false, del: false },
    staff: { add: false, view: false, del: false, modify: false },
    stock: { add: false, view: false, del: false },
    ticket: { create: false, manage: false },
    report: { manage: false },
  });

  useEffect(() => {
    let shouldSetPriviledges =
      typeof initial_data !== "undefined" && initial_data.acl ? true : false;
    const test = toJS(initial_data && initial_data.acl);

    if (test && test.length > 0) {
      const data = initial_data && initial_data.acl;
      const id = initial_data && initial_data._id;
      setId(id);
      // let data;
      // data = JSON.parse(acl);
      setPriviledges((state) => ({
        ...state,
        asset: {
          add: (data && data.asset.add) || false,
          view: (data && data.asset.view) || false,
          del: (data && data.asset.del) || false,
          modify: (data && data.asset.modify) || false,
        },
        branch: {
          add: (data && data.branch.add) || false,
          view: (data && data.branch.view) || false,
          del: (data && data.branch.del) || false,
        },
        category: {
          add: (data && data.category.add) || false,
          view: (data && data.category.view) || false,
          del: (data && data.category.del) || false,
        },
        company: {
          manage: (data && data.company.manage) || false,
        },
        department: {
          add: (data && data.department.add) || false,
          view: (data && data.department.view) || false,
          del: (data && data.department.del) || false,
        },
        leave: {
          add: (data && data.leave && data.leave.add) || false,
          view: (data && data.leave && data.leave.view) || false,
          del: (data && data.leave && data.leave.del) || false,
        },
        pos: {
          sell: (data && data.pos.sell) || false,
          view: (data && data.pos.view) || false,
          modify: (data && data.pos.modify) || false,
        },
        product: {
          add: (data && data.product.add) || false,
          view: (data && data.product.view) || false,
          del: (data && data.product.del) || false,
        },
        staff: {
          add: (data && data.staff.add) || false,
          view: (data && data.staff.view) || false,
          del: (data && data.staff.del) || false,
          modify: (data && data.staff.modify) || false,
        },
        stock: {
          add: (data && data.stock.add) || false,
          view: (data && data.stock.view) || false,
          del: (data && data.stock.del) || false,
        },
        ticket: {
          create: (data && data.ticket.create) || false,
          manage: (data && data.ticket.manage) || false,
        },
        report: {
          manage: (data && data.report.manage) || false,
        },
      }));
    }
  }, [initial_data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      priviledges,
      id,
    };
    assignRole(data);
  };
  const handleRoleChange = (event, role) => {
    event.persist();
    setPriviledges((formState) => ({
      ...formState,
      [role]: {
        ...formState[role],
        [event.target.name]: event.target.checked,
      },
    }));
  };
  const resetForm = () => {
    setPriviledges((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        asset: { add: false, view: false, del: false, modify: false },
        branch: { add: false, view: false, del: false },
        category: { add: false, view: false, del: false },
        company: { manage: false },
        department: { add: false, view: false, del: false },
        leave: { add: false, view: false, del: false },
        pos: { sell: false, view: false, modify: false },
        product: { add: false, view: false, del: false },
        staff: { add: false, view: false, del: false, modify: false },
        stock: { add: false, view: false, del: false },
        ticket: { create: false, manage: false },
        report: { manage: false },
      },
    }));
  };
  return (
    <Fragment>
      <Flex direction="column">

        <Box>
          <FormControl id="asset">
            <FormLabel>Asset</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.asset.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "asset")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.asset.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "asset")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.asset.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "asset")}
                >
                  Del
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.asset.modify || false}
                  name="modify"
                  onChange={(event) => handleRoleChange(event, "asset")}
                >
                  Modify
                </Checkbox>
              </WrapItem>
            </Wrap>
          </FormControl>
        </Box>
    
        
        <Box>
          <FormControl id="branch">
            <FormLabel>Branch</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.branch.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "branch")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.branch.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "branch")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.branch.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "branch")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
        
        <Box>
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.category.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "category")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.category.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "category")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.category.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "category")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
        
        <Box>
          <FormControl id="company">
            <FormLabel>Company</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.company.manage || false}
                  name="manage"
                  onChange={(event) => handleRoleChange(event, "company")}
                >
                  Manage
                </Checkbox>
              </WrapItem> 
                 </Wrap>
          </FormControl>
        </Box>
    
        
        <Box>
          <FormControl id="department">
            <FormLabel>Department</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.department.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "department")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.department.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "department")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.department.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "department")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
        
        <Box>
          <FormControl id="leave">
            <FormLabel>Vacation</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.leave.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "leave")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.leave.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "leave")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.leave.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "leave")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
        
        <Box>
          <FormControl id="pos">
            <FormLabel>POS</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.pos.sell || false}
                  name="sell"
                  onChange={(event) => handleRoleChange(event, "pos")}
                >
                  Sell
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.pos.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "pos")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.pos.modify || false}
                  name="modify"
                  onChange={(event) => handleRoleChange(event, "pos")}
                >
                  Modify
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
        <Box>
          <FormControl id="product">
            <FormLabel>Products</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.product.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "product")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.product.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "product")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.product.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "product")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
    
        <Box>
          <FormControl id="staff">
            <FormLabel>Staff</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.staff.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "staff")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.staff.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "staff")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.staff.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "staff")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
    
        <Box>
          <FormControl id="stock">
            <FormLabel>Stock</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.stock.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "stock")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.stock.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "stock")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.stock.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "stock")}
                >
                  Del
                </Checkbox>
              </WrapItem> 
            </Wrap>
          </FormControl>
        </Box>
    
    
    
        <Box>
          <FormControl id="ticket">
            <FormLabel>Ticket</FormLabel>
            <Wrap>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.ticket.create || false}
                  name="create"
                  onChange={(event) => handleRoleChange(event, "ticket")}
                >
                  Create
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.ticket.manage || false}
                  name="manage"
                  onChange={(event) => handleRoleChange(event, "ticket")}
                >
                  Manage
                </Checkbox>
              </WrapItem>
             
            </Wrap>
          </FormControl>
        </Box>
    
    
        <Box>
          <FormControl id="report">
            <FormLabel>Report</FormLabel>
            <Wrap>
              
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.report.view || false}
                  name="manage"
                  onChange={(event) => handleRoleChange(event, "report")}
                >
                  Manage
                </Checkbox>
              </WrapItem>
             
            </Wrap>
          </FormControl>
        </Box>
    
      </Flex>
    </Fragment>
  );
};

export default ACL;

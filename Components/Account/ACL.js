import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box, 
  Stack,
  Button,
  Select,
  useToast, 
  Wrap,
  WrapItem,
  FormLabel,
  FormControl, 
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { toJS } from "mobx";

const ACLForm = ({
  reset,
  saved,
  action,
  error, 
  sending,
  message,
  assignRole,
  toggle,
  initial_data,
}) => {
  const toast = useToast();
  const [uid, setId] = useState();
  const [priviledges, setPriviledges] = useState({
    asset: { add: false, view: false, del: false, modify: false },
    branch: { add: false, view: false, del: false },
    category: { add: false, view: false, del: false },
    company: { manage: false },
    department: { add: false, view: false, del: false },
    director: { add: false, view: false, del: false },
    leave: { add: false, view: false, del: false },
    pos: { sell: false, view: false, modify: false },
    product: { add: false, view: false, del: false },
    staff: { add: false, view: false, del: false, modify: false },
    stock: { add: false, view: false, del: false },
    ticket: { create: false, manage: false },
    report: { manage: false },
  });

  useEffect(() => {
      const test = toJS(initial_data && initial_data.acl); 
      const id = initial_data && initial_data._id;
      setId(id);
    if (test && test.length > 0) {
      const data = initial_data && initial_data.acl[0];
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
        director: {
          add: (data && data.director  && data.director.add) || false,
          view: (data && data.director  && data.director.view) || false,
          del: (data && data.director  && data.director.del) || false,
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
    const roleData = {
      priviledges,
      id: uid,
    };
    assignRole(roleData);
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

  useEffect(() => {
    if (action === "hasRole") {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
      toggle('role');
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      resetForm();
      toggle('role');
    };
  }, [action]);

  useEffect(() => {
    if (error === true && action === "hasRoleError") {
      toast({
        title: "Server Response.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      reset("error", false);
      reset("message", "");
      resetForm();
      toggle('role');
    };
  }, [error]);

  
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
        director: { add: false, view: false, del: false },
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
      {/* <Flex direction="column" align="space-between" justifyContent="space-between"> */}
      <Stack spacing="24px">
        <Box>
          <FormControl id="asset">
            <FormLabel>Asset</FormLabel>
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
          <FormControl id="department">
            <FormLabel>Director</FormLabel>
            <Wrap spacing="20px">
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.director.add || false}
                  name="add"
                  onChange={(event) => handleRoleChange(event, "director")}
                >
                  Add
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.director.view || false}
                  name="view"
                  onChange={(event) => handleRoleChange(event, "director")}
                >
                  View
                </Checkbox>
              </WrapItem>
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.director.del || false}
                  name="del"
                  onChange={(event) => handleRoleChange(event, "director")}
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
              <WrapItem>
                <Checkbox
                  isChecked={priviledges.staff.modify || false}
                  name="modify"
                  onChange={(event) => handleRoleChange(event, "staff")}
                >
                  Modify
                </Checkbox>
              </WrapItem>
            </Wrap>
          </FormControl>
        </Box>
    
    
        <Box>
          <FormControl id="stock">
            <FormLabel>Stock</FormLabel>
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
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
            <Wrap spacing="20px">
              
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
    <Box mt={1} align="right">
      <Wrap spacing="20px">
        <WrapItem>
        <Button
                variant="outline"
                disabled={sending}
                mr={3}
                onClick={() => toggle('role')}
              >
                Cancel
              </Button> 
        </WrapItem>
        <WrapItem>
        <Button
                disabled={sending}
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={sending}
                bg="brand.mainAccent"
                color="brand.white"
                variant="ghost"
                _hover={{
                  borderColor: "brand.mainAccent",
                  bg: "brand.white",
                  color: "brand.mainAccent",
                  boxShadow: "md",
                }}
                _focus={{}}
              >
                Save Role
              </Button>
        </WrapItem>
      </Wrap>
    </Box>
      </Stack>
    </Fragment>
  );
};

export default ACLForm;

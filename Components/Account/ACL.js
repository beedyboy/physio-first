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
  FormLabel, 
  FormControl, 
  FormHelperText,
  FormErrorMessage, 
} from "@chakra-ui/react";

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
      typeof initial_data !== "undefined" ? true : false;
    if (shouldSetPriviledges) {
      const data = initial_data && initial_data.acl;
      const id = initial_data && initial_data._id;
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
      id 
    };
    assignRole(data);
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
     this is modal
    </Fragment>
  );
};

export default ACL;

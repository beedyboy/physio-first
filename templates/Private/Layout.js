import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  BoxProps,
  Center,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
  useDisclosure,
} from "@chakra-ui/react";
import DesktopLayout from "./DesktopLayout";
import { useRouter } from "next/router";
import MobileLayout from "./MobileLayout";
import { MdCheckCircle, MdDashboard, MdSettings } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";
import Utility from "../../services/UtilityService";

const Redirect = ({ to }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, [to]);
  return null;
};
const Layout = (props) => { 
  const loggedIn = Utility.get("staff_token") ? false : true;
 const user = Utility.get("lastname") ?? "guest";
 
let access;
if(loggedIn === false) {
  const obj = Utility.get("acl");
  const acl = JSON.parse(obj);
  access = acl.branch.view;
  // console.log({access})
} 
  const { pathname } = useRouter();
  const company = "Physio First"
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false });

  const routes = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "System",
      href: "/system",
      icon: <MdSettings />,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: <MdCheckCircle />,
    },
    {
      label: "Vacation",
      href: "/vacation",
      icon: <FaUmbrellaBeach />,
    },
  ];
  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose();
    }
  }, [showOnBreakpoint]);
  // if (loggedIn) {
  //   return <Redirect to="/auth/login" />;
  // }
  return (
    <Fragment>
      {showOnBreakpoint ? (
        <MobileLayout
          pathname={pathname}
          user={user}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          routes={routes}
          company={company}
          {...props}
        />
      ) : (
        <DesktopLayout
          pathname={pathname}
          user={user}
          routes={routes}
          company={company}
          {...props}
        />
      )}
    </Fragment>
  );
};

export default Layout;

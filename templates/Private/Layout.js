import React, { Fragment } from "react";
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

const Layout = (props) => {
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
  ];
  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose();
    }
  }, [showOnBreakpoint]);
  return (
    <Fragment>
      {showOnBreakpoint ? (
        <MobileLayout
          pathname={pathname}
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
          routes={routes}
          company={company}
          {...props}
        />
      )}
    </Fragment>
  );
};

export default Layout;

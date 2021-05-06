import React, { Fragment,  useEffect } from "react";
import { 
  useBreakpointValue, 
  useDisclosure,
} from "@chakra-ui/react";
import DesktopLayout from "./DesktopLayout";
import { useRouter } from "next/router";
import MobileLayout from "./MobileLayout";
import { MdCheckCircle, MdDashboard, MdSettings } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";
import Utility from "../../services/UtilityService";

 
const Layout = (props) => { 
  const loggedIn = Utility.get("staff_token") ? false : true;
 const user = Utility.get("lastname") ?? "guest";
 
let access, acl;
if(loggedIn === false) {
  const obj = Utility.get("acl");
  if(obj &&  obj !== 'undefined') {
    acl = JSON.parse(obj);
    access = acl.branch.view;
  }
  // console.log({access})
} 
const router  = useRouter();
  const { pathname } = useRouter();
  const company = "Physio First"
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false });

  const routes = [
    {
      label: "Dashboard",
      href: "/",
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
 useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose();
    }
  }, [showOnBreakpoint]);
 
 useEffect(() => {
  if (loggedIn) {
    router.push("/auth/login");
  }
  }, [loggedIn]);
 
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
          acl={acl}
          {...props}
        />
      ) : (
        <DesktopLayout
          pathname={pathname}
          user={user}
          routes={routes}
          company={company}
          acl={acl}
          {...props}
        />
      )}
    </Fragment>
  );
};

export default Layout;

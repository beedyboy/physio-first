import React, { Fragment } from "react";
import { 
  Drawer,
  Select,
  DrawerBody,
  FormControl,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const DrawalWidget = (props) => {
  const { handleClose, placement, open, title, children } = props;
  return (
    <Fragment>
      <Drawer
        isOpen={open}
        placement={placement || "right"}
        // initialFocusRef={firstField}
        onClose={handleClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default DrawalWidget;

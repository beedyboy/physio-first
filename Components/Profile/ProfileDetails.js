import { Flex, Box, Stack,  Text } from "@chakra-ui/react";
import React, {   useState, Fragment, useDisclosure } from "react";
import DrawalWidget from "../../widgets/DrawalWidget";
import ProfileForm from "./ProfileForm";

function ProfileDetails(props) {
    const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowData, setRowData] = useState();
  const editProfile = () => {
    setRowData(data);
    onOpen();
  };
  return (
    <Fragment>
      <Flex direction="column" justifyContent="space-between" w="100%">
        
        <Stack spacing="24px">
          <Box d="flex" justifyContent="space-between">
            <Text as="span" fontWeight="bolder">
              {" "}
              Firstname:
              <Text fontWeight="normal">{data.firstname}</Text>
            </Text>
          </Box>
        </Stack>
      </Flex>
      <DrawalWidget title="Edit Profile" open={isOpen} toggle={onClose}>
        <ProfileForm
        //   reset={reset}
        //   saved={saved}
        //   error={error}
        //   message={message}
        //   sending={sending}
        //   reset={resetProperty}
        //   action={action}
        //   updateProfile={updateProfile}
        {...props}
          toggle={onClose}
          initial_data={rowData}
        />
      </DrawalWidget>
    </Fragment>
  );
}

export default ProfileDetails;

import {
  Flex,
  Box,
  Stack,
  Text,
  Badge, 
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, Fragment } from "react";
import DrawalWidget from "../../widgets/DrawalWidget"; 
import ProfileForm from "./ProfileForm";
import { MdEdit } from "react-icons/md";

function ProfileDetails(props) {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowData, setRowData] = useState();
  let access = data && data.acl;
  let acl;

  const stretchAccess = (item) => {
    var result = [];
    for (var property in item) {
      result.push(
        <Badge colorScheme={item[property] === true ? "green" : "red"}>
          {item[property] === true ? `Can ${property} ` : `Cannot ${property} `}
        </Badge>
      );
    }
    return <>{result}</>;
  };

  const renderSuggestions = () => {
    // console.log("suggestions :",suggestions);
    if (access && access.length === 0) {
      return null;
    }
    return (
      <ul>
        {access &&
          access.length > 0 &&
          Object.keys(access[0]).map((key) => {
            return (
              <>
                <li>
                  {" "}
                  {key.toUpperCase()}  {" "}
                </li>
                  {stretchAccess(access[0][key])}
              </>
            );
          })}
      </ul>
    );
  };
 
  const editProfile = () => {
    setRowData(data);
    onOpen();
  };
  return (
    <Fragment>
      <Stack  direction={["column", "row"]} spacing="24px">
        <Flex direction="column" justifyContent="flex-start" w="100%">
         
        <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>Information</Text>
          <Divider />
          <Stack mt={2} mb={2} spacing="24px">
            <Stack  direction={["column", "row"]} spacing="44px">
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Firstname:
                <Text as="span" fontWeight="normal"> {data.firstname || 'Nil'}</Text>
              </Text>

              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Lastname:
                <Text as="span" fontWeight="normal"> {data.lastname || 'Nil'}</Text>
              </Text>
            </Stack>
            <Stack  direction={["column", "row"]} spacing="44px">
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Email:
                <Text as="span" fontWeight="normal"> {data.email || 'Nil'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Phone:
                <Text as="span" fontWeight="normal"> {data.phone_number || 'Nil'}</Text>
              </Text>
            </Stack>
            <Stack  direction={["column", "row"]} spacing="44px">
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                StaffId:
                <Text as="span" fontWeight="normal"> {data.staffId || 'Nil'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Branch:
                <Text as="span" fontWeight="normal"> {data.branch && data.branch.name || 'Nil'}</Text>
              </Text>
            </Stack>
            <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Address:
                <Text as="span" fontWeight="normal"> {data.address && data.address|| 'Nil'}</Text>
              </Text>
          </Stack>

          <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>Emergency Information</Text>
          <Divider  mb={2} />
          <Stack direction="column" mt={2} spacing="24px">
            
               <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Emergency contact:
                <Text as="span" fontWeight="normal"> {data.emergency_contact || 'Nil'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Phone:
                <Text as="span" fontWeight="normal"> {data.emergency_phone || 'Nil'}</Text>
              </Text> 
            
         
          </Stack>
          <Button leftIcon={<MdEdit />} onClick={editProfile} colorScheme="teal" variant="solid">
    Edit
  </Button>
        </Flex>

        <Flex direction="column" justifyContent="space-between" w="100%">
         
        <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>Roles</Text>
          <Divider />
        
          {renderSuggestions()}
        </Flex>
      </Stack>

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

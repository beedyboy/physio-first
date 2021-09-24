import {
  Flex, 
  Stack,
  Text,
  Tag,
  HStack, 
  Badge, 
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import DrawalWidget from "../../widgets/DrawalWidget"; 
import ProfileForm from "./ProfileForm";
import { MdEdit } from "react-icons/md";
import shortId from "short-id";

function ProfileDetails(props) {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  let access = data && data.acl; 

  const stretchAccess = (item) => {
    var result = [];
    for (var property in item) {
      result.push(
        <Badge  key={shortId.generate()} colorScheme={item[property] === true ? "green" : "red"}>
          {item[property] === true ? `Can ${property} ` : `Cannot ${property} `}
        </Badge>
      );
    }
    return <>{result}</>;
  };

  const renderRoles = () => {
    // console.log("suggestions :",suggestions);
    if (access && access.length === 0) {
      return null;
    }
    return (
      <ul>
        {access &&
          access.length > 0 &&
          Object.keys(access[0]).map((key, i) => {
            return (
              <Fragment key={i}>
                <li key={shortId.generate()}>
                  {" "}
                  {key.toUpperCase()}  {" "}
                </li>
                  {stretchAccess(access[0][key])}
              </Fragment>
            )
          })}
      </ul>
    );
  };
 
  const editProfile = () => { 
    onOpen();
  };
  return (
    <Fragment>
      <Stack  direction={["column", "row"]} spacing="24px">
        <Flex direction="column" justifyContent="flex-start" w="100%">
         
        <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>Profile Information</Text>
          <Divider />
          <Stack mt={2} mb={2} spacing="24px">
            <Stack  direction={["column", "row"]} spacing="44px">
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Firstname:
                <Text as="span" fontWeight="normal"> {data && data.firstname || 'N/A'}</Text>
              </Text>

              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Lastname:
                <Text as="span" fontWeight="normal"> {data && data.lastname || 'N/A'}</Text>
              </Text>
            </Stack>
            <Stack  direction={["column", "row"]} spacing="44px">
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Email:
                <Text as="span" fontWeight="normal"> {data && data.email || 'N/A'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Phone:
                <Text as="span" fontWeight="normal"> {data && data.phone_number || 'N/A'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Dob:
                <Text as="span" fontWeight="normal"> {data && data.dob || 'N/A'}</Text>
              </Text>
            </Stack>
            <Stack  direction={["column", "row"]} spacing="44px">
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                StaffId:
                <Text as="span" fontWeight="normal"> {data && data.staffId || 'N/A'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Branch:
                <Text as="span" fontWeight="normal"> {data && data.branch && data.branch.name || 'N/A'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Position:
                <Text as="span" fontWeight="normal"> {data?.position || 'N/A'}</Text>
              </Text>
            </Stack>
            <Stack> <Text fontSize="md" as="span" fontWeight="bolder">
            Allergies:
                      </Text>
            <HStack spacing={4}>
              {data?.alergies?.map?.((item) => (
                <Tag size="sm" key={item} variant="solid" colorScheme="teal">
                {item}
                </Tag>
              )) || 'N/A'}
            </HStack>
              </Stack>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Address:
                <Text as="span" fontWeight="normal"> {data && data.address && data.address|| 'N/A'}</Text>
              </Text>
          </Stack>

          <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>Emergency Information</Text>
          <Divider  mb={2} />
          <Stack direction="column" mt={2} spacing="24px">
            
               <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Emergency contact:
                <Text as="span" fontWeight="normal"> {data && data.emergency_contact || 'N/A'}</Text>
              </Text>
              <Text fontSize="md" as="span" fontWeight="bolder">
                {" "}
                Phone:
                <Text as="span" fontWeight="normal"> {data && data.emergency_phone || 'N/A'}</Text>
              </Text> 
            
         
          </Stack>
          <Button leftIcon={<MdEdit />}  size="sm" onClick={editProfile} colorScheme="teal" mt={5} variant="solid">
    Edit
  </Button>
        </Flex>

        <Flex direction="column" justifyContent="space-between" w="100%">
         
        <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>Roles</Text>
          <Divider />
        
          {renderRoles()}
        </Flex>
      </Stack>

      <DrawalWidget title="Edit Profile" open={isOpen} handleClose={onClose}>
        <ProfileForm 
           {...props}
          toggle={onClose}
          initial_data={data}
        />
      </DrawalWidget>
    </Fragment>
  );
}

export default ProfileDetails;
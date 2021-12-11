import {
  Flex,
  Stack,
  Box,
  Text,
  Image,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import DrawalWidget from "../../widgets/DrawalWidget";
import BankForm from "./BankForm";
import { MdEdit } from "react-icons/md";

function Bank(props) {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const editProfile = () => {
    onOpen();
  };
  return (
    <Fragment>
      <Flex direction="column" justifyContent="flex-start" w="100%">
        <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>
          Profile Information
        </Text>
        <Divider />
        <Stack mt={2} mb={2} spacing="24px">
          <Stack direction={["column", "row"]} spacing="44px">
            <Text fontSize="md" as="span" fontWeight="bolder">
              {" "}
              SIN:
              <Text as="span" fontWeight="normal">
                {" "}
                {(data && data.sin) || "N/A"}
              </Text>
            </Text>
          </Stack>
        </Stack>

        <Text fontSize="md" fontWeight="bolder" color="green" mt={3}>
          Void Cheque
        </Text>
        <Divider mb={2} />
        <Stack direction="column" mt={2} spacing="24px">
          <Text fontSize="md" as="span" fontWeight="bolder">
            {" "}
            {/* Emergency contact: */}
          </Text>
          {data.cheque ? (
            <Box boxSize='sm'>
            <Image src={data.cheque} alt={data.firstname} />
            </Box>
          ) : null}
        </Stack>
        <Button
          leftIcon={<MdEdit />}
          size="sm"
          onClick={editProfile}
          colorScheme="teal"
          mt={5}
          variant="solid"
        >
          Edit
        </Button>
      </Flex>

      <DrawalWidget title="Edit Account" open={isOpen} handleClose={onClose}>
        <BankForm {...props} toggle={onClose} initial_data={data} />
      </DrawalWidget>
    </Fragment>
  );
}

export default Bank;

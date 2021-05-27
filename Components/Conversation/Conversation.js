import React, { Fragment, useEffect, useState } from "react";
import { Box, Flex, Button, Stack, Text, Divider } from "@chakra-ui/react";
import ReactHtmlParser from "react-html-parser";
import { observer } from "mobx-react-lite";
import AddConversation from "./AddConversation";
import { useMobxStores } from "../../stores/stores";
import moment from "moment";

const Conversation = ({ id, respondent, description, tDate }) => {
  const { conversationStore } = useMobxStores();
  const { conversations, fetchConversation } = conversationStore;
  const [reply, setReply] = useState(false);
  useEffect(() => {
    fetchConversation(id);
  }, [id]);
  return (
    <Fragment>
      <Flex direction="column" justifyContent="space-between">
        <Box boxShadow="base" p="6" rounded="md" bg="white">
          <Stack spacing="24px" direction="column">
            <Button colorScheme="purple" onClick={() => setReply(!reply)}>
              Reply
            </Button>

            {reply ? <AddConversation id={id} respondent={respondent} /> : ""}
          </Stack>
        </Box>
        <Box>
        <Stack
                p={2} 
                boxShadow="base"
                mt={2}
                rounded="md"
                bg="white"
              >
                <Box d="flex" justifyContent="space-between">
                  <Text fontWeight="bolder">
                  Staff
                  </Text>
                  <Text as="p">
                    {moment(tDate).format("h:mma") +
                      " " +
                      moment(tDate).format("MMMM d, YYYY")}
                  </Text>
                </Box>
                <Divider />
                <Box>{ReactHtmlParser(description)}</Box>
              </Stack>

          {conversations && conversations.length < 1 ? (
            <>
              <Text mt={2} fontWeight="bolder"> No reply found</Text>
            </>
          ) : (
            conversations.map((convo) => (
              <Stack
                p={2}
                key={convo._id}
                boxShadow="base"
                mt={2}
                rounded="md"
                bg="white"
              >
                <Box d="flex" justifyContent="space-between">
                  <Text fontWeight="bolder">
                    {convo.respondent === "TaskPerson" ? "Admin" : "Staff"}{" "}
                  </Text>
                  <Text as="p">
                    {moment(convo.createdAt).format("h:mma") +
                      " " +
                      moment(convo.createdAt).format("MMMM d, YYYY")}
                  </Text>
                </Box>
                <Divider />
                <Box>{ReactHtmlParser(convo.description)}</Box>
              </Stack>
            ))
          )}
        </Box>
      </Flex>
    </Fragment>
  );
};

export default observer(Conversation);

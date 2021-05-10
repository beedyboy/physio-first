import React, { Fragment, useEffect, useState } from "react";
import { Box, Flex, Button, Stack, Text } from "@chakra-ui/react";
import ReactHtmlParser from "react-html-parser";
import { observer } from "mobx-react-lite";
import AddConversation from "./AddConversation";
import { useMobxStores } from "../../stores/stores";

const Conversation = ({ id, respondent }) => {
  const { conversationStore } = useMobxStores();
  const {
    allConversations: conversations,
    fetchConversation,
  } = conversationStore;
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
          {conversations &&
            conversations.map((convo) => (
              <Stack className="p-2" key={convo._id}>
                <Text as="p">{convo.createdAt}</Text>
                <Box>{ReactHtmlParser(convo.description)}</Box>
              </Stack>
            ))}
        </Box>
      </Flex>
    </Fragment>
  );
};

export default observer(Conversation);

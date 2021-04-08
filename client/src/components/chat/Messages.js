import { useSubscription, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import GroupedMessages from "./GroupedMessages";
import { AddMessage } from "./MessageInput";
import { formatMessages } from "./messagesUtils";
import { MessagesEl } from "./MessagesElements";

const MESSAGES_SUB = gql`
  subscription($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      username
      content
      blackList
      messageAuthor {
        id
        firstName
        lastName
      }
      chatId
      createdAt
    }
  }
`;

export const Messages = ({ user, chatId, userId }) => {
  const [sortedMessages, setSortedMessages] = useState([]);
  const { data, loading, error } = useSubscription(MESSAGES_SUB, {
    variables: { chatId },
  });

  //   Sorted messages structure: {
  //    id: message id | first message.id in the group,
  //    type: "sent" /or "received",
  //    name: messaged username,
  //    avatar: user image,
  //    messages: grouped lines of messages that belongs to the same user, which is between two users on the chat.
  // }
  const sortMessagesToGroups = () => {
    if (error) return console.log(error.message);
    if (data?.messages?.length) {
      const formattedMessages = formatMessages(data.messages, user);
      setSortedMessages(formattedMessages);
    } else {
      setSortedMessages([]);
    }
  };

  useEffect(() => {
    sortMessagesToGroups();
    // eslint-disable-next-line
  }, [data]);
  useEffect(() => {
    const messagesEl = document.querySelector(".messages");
    messagesEl.scrollTop = messagesEl.scrollHeight;
    // eslint-disable-next-line
  }, [sortedMessages]);

  return (
    <MessagesEl.Container>
      <MessagesEl.SubContainer className="messages">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : !chatId ? (
          <MessagesEl.Text style={{ opacity: 0.3 }}>
            Chat not selected!
          </MessagesEl.Text>
        ) : sortedMessages.length ? (
          sortedMessages.map((msgData) => (
            <GroupedMessages key={msgData.id} {...msgData} userId={userId} />
          ))
        ) : (
          <MessagesEl.Text style={{ opacity: 0.3 }}>
            You have no messages in this Chat!
          </MessagesEl.Text>
        )}
      </MessagesEl.SubContainer>
      <AddMessage user={user} chatId={chatId} userId={userId} />
    </MessagesEl.Container>
  );
};

import { useSubscription, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import GroupedMessages from "./GroupedMessages";

import "./Messages.css";

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

export const Messages = ({ username: myUsername, chatId, userId }) => {
  const [sortedMessages, setSortedMessages] = useState([]);
  const { data, loading, error } = useSubscription(MESSAGES_SUB, {
    variables: { chatId },
  });

  //   Sorted messages structure: {
  //    id: message id / later will be userId,
  //    type: "sent" /or "received",
  //    name: messaged username,
  //    avatar: user image,
  //    messages: grouped lines of messages that belongs to the same user, which is between two users on the chat.
  // }
  const sortMessagesToGroups = () => {
    if (error) return console.log(error.message);
    if (data?.messages?.length) {
      let userMessages = [];
      const formattedMessages = [];
      // copy original | deep cloning
      const allMessages = JSON.parse(JSON.stringify(data.messages));

      allMessages.forEach((msg, index) => {
        let nextUser = allMessages[index + 1]?.username || "";
        // Lets check for message blackList, where it contains users ids who deleted other user message | since he is not the author of message we just hide this message from him so he wont see.
        const isOnBlackList = msg.blackList.includes(userId);
        const currentMsg = {
          id: msg.id,
          text: msg.content,
          chatId: msg.chatId,
          messageAuthor: msg.messageAuthor,
          createdAt: msg.createdAt,
        };

        // 1.if current message is my message do: =>
        if (myUsername === msg.username) {
          if (myUsername === nextUser) {
            // 1.1username === nextUser | means: is next message also belongs to me?
            // a)if YES: then temporarily store it in the userMessages array
            userMessages.push(currentMsg);
          } else {
            // b)if NO: then take all messages from temp array userMessages and push to formattedMessages array, and clear temp array userMessages=[]
            const newObj = {
              id: msg.id,
              type: "sent",
              name: msg.username,
              avatar: "",
              messages: [...userMessages, currentMsg],
            };
            formattedMessages.push(newObj);
            userMessages = [];
          }
        }
        // 2.if current message is NOT my message do: =>
        else {
          // 2.1username === nextUser | means: is next message also belongs to the same user?
          if (msg.username === nextUser) {
            // a)if YES: then temporarily store it in the userMessages array
            !isOnBlackList && userMessages.push(currentMsg);
          } else {
            // b)if NO: then take all messages from temp array userMessages and push to formattedMessages array, and clear temp array userMessages=[]
            const messages = isOnBlackList
              ? userMessages
              : [...userMessages, currentMsg];

            const newObj = {
              id: msg.id,
              type: "received",
              name: msg.username,
              avatar: "",
              messages,
            };
            messages.length > 0 && formattedMessages.push(newObj);
            userMessages = [];
          }
        }
      });

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
    <div
      style={{
        maxHeight: "500px",
        minHeight: "500px",
        overflow: "scroll",
        padding: "20px",
        paddingTop: "400px",
      }}
      className="box_shadow messages"
    >
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : !chatId ? (
        <p>Chat not selected!</p>
      ) : sortedMessages.length ? (
        sortedMessages?.map((msgData) => (
          <GroupedMessages key={msgData.id} {...msgData} userId={userId} />
        ))
      ) : (
        <p>You have no messages in this Chat!</p>
      )}
    </div>
  );
};

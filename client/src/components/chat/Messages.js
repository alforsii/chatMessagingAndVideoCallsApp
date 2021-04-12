import React, { useEffect, useState } from "react";
import { useSubscription, gql } from "@apollo/client";
// import { Spinner } from "react-bootstrap";
import { formatMessages } from "./messagesUtils";
import { MessagesGroup } from "./MessagesGroup";
import { MessageInput } from "./MessageInput";
import { MessagesEl } from "./MessagesElements";
import { StyledLoader } from "../StyledLoader";
// import { ImPencil } from "react-icons/im";
// import { GiKeyboard } from "react-icons/gi";
// import { MessageTypingUsers } from "./MessageTypingUsers";

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
// const TYPING_USERS_QUERY = gql`
//   subscription($chatId: ID!) {
//     typingChatUsers(chatId: $chatId) {
//       id
//       users {
//         id
//         username
//       }
//     }
//   }
// `;

export const Messages = ({ user, chatId, userId, isAuthorizedChat }) => {
  const [sortedMessages, setSortedMessages] = useState([]);
  // const [typingUsers, setTypingUsers] = useState([]);
  const { data, loading } = useSubscription(MESSAGES_SUB, {
    variables: { chatId },
  });
  // const { data: data2, error: error2 } = useSubscription(TYPING_USERS_QUERY, {
  //   variables: { chatId },
  // });

  //   Sorted messages structure: {
  //    id: message id | first message.id in the group,
  //    type: "sent" /or "received",
  //    name: messaged username,
  //    avatar: user image,
  //    messages: grouped lines of messages that belongs to the same user, which is between two users on the chat.
  // }
  const sortMessagesToGroups = () => {
    setSortedMessages([]);
    if (data) {
      const formattedMessages = formatMessages(data.messages, user);
      setSortedMessages(formattedMessages);
      return;
    }
  };

  useEffect(() => {
    sortMessagesToGroups();
    // eslint-disable-next-line
  }, [data]);
  // useEffect(() => {
  //   if (data2) {
  //     setTypingUsers(data2.typingChatUsers.users);
  //   } else {
  //     setTypingUsers([]);
  //   }
  //   // eslint-disable-next-line
  // }, [data2]);
  useEffect(() => {
    if (sortedMessages.length) {
      const messagesEl = document.querySelector(".messages");
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
    // eslint-disable-next-line
  }, [sortedMessages]);

  // if (error) console.log(error.message);
  // if (error2) console.log(error2.message);
  return (
    <MessagesEl.Container>
      <MessagesEl.SubContainer className="messages">
        {loading ? (
          <StyledLoader />
        ) : !chatId || !isAuthorizedChat ? (
          <MessagesEl.Text style={{ opacity: 0.5 }}>
            Chat not selected!
          </MessagesEl.Text>
        ) : sortedMessages.length ? (
          sortedMessages.map((msgData) => (
            <MessagesGroup key={msgData.id} {...msgData} userId={userId} />
          ))
        ) : (
          <MessagesEl.Text style={{ opacity: 0.3 }}>
            You have no messages in this Chat!
          </MessagesEl.Text>
        )}
        {/* <MessageTypingUsers userId={userId} chatId={chatId} /> */}
      </MessagesEl.SubContainer>
      <MessageInput user={user} chatId={chatId} userId={userId} />
    </MessagesEl.Container>
  );
};

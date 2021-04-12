import { useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { MessagesEl } from "./MessagesElements";

const NEW_MESSAGE = gql`
  mutation($content: String!, $username: String!, $userId: ID!, $chatId: ID!) {
    addMessage(
      data: {
        content: $content
        username: $username
        userId: $userId
        chatId: $chatId
      }
    ) {
      id
      content
      username
    }
  }
`;
const START_TYPING_QUERY = gql`
  mutation($username: String!, $userId: ID!, $chatId: ID!) {
    userStartTyping(username: $username, userId: $userId, chatId: $chatId)
  }
`;
const STOP_TYPING_QUERY = gql`
  mutation($userId: ID!, $chatId: ID!) {
    userStopTyping(userId: $userId, chatId: $chatId)
  }
`;

export const MessageInput = ({ user, chatId, userId }) => {
  const [AddMessage] = useMutation(NEW_MESSAGE);
  const [StartTyping] = useMutation(START_TYPING_QUERY);
  const [StopTyping] = useMutation(STOP_TYPING_QUERY);
  const inputRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.email && inputRef.current.value && userId && chatId) {
        await AddMessage({
          variables: {
            username: user.email,
            chatId,
            userId,
            content: inputRef.current.value,
          },
        });
        inputRef.current.value = "";
        const messagesEl = document.querySelector(".messages");
        messagesEl.scrollTop = messagesEl.scrollHeight;
        handleStopTyping();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    if (e.currentTarget.value) {
      handleStartTyping();
    } else {
      handleStopTyping();
    }
  };

  const handleStartTyping = async (e) => {
    try {
      if (chatId) {
        await StartTyping({
          variables: {
            userId,
            chatId,
            username: `${user.firstName} ${user.lastName}`,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleStopTyping = async () => {
    try {
      if (chatId) {
        await StopTyping({
          variables: { userId, chatId },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      handleStopTyping();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MessagesEl.Form style={{ position: "relative" }} onSubmit={handleSubmit}>
        <MessagesEl.Label htmlFor="message_input"></MessagesEl.Label>
        <MessagesEl.Input
          id="message_input"
          placeholder="Type message..."
          ref={inputRef}
          autoComplete="off"
          onChange={handleInputChange}
          onBlur={handleStopTyping}
          onPaste={handleInputChange}
        />
        <MessagesEl.Button type="submit">Send</MessagesEl.Button>
      </MessagesEl.Form>
    </>
  );
};

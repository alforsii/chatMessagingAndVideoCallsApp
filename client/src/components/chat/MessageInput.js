import { useMutation, gql } from "@apollo/client";
import { MessagesEl } from "./MessagesElements";
import { useRef } from "react";

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

export const AddMessage = ({ user, chatId, userId }) => {
  const [AddMessage] = useMutation(NEW_MESSAGE);
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MessagesEl.Form onSubmit={handleSubmit}>
      <MessagesEl.Label htmlFor="message_input"></MessagesEl.Label>
      <MessagesEl.Input
        id="message_input"
        placeholder="Type message..."
        ref={inputRef}
      />
      <MessagesEl.Button type="submit">Send</MessagesEl.Button>
    </MessagesEl.Form>
  );
};

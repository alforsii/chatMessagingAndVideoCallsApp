import { useMutation, gql } from "@apollo/client";
import { MessagesEl } from "./MessagesElements";
import { useRef } from "react";
// import { Elements } from "../GlobalElements";

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

//  <MessagesEl.Form onSubmit={handleSubmit}>
//    <MessagesEl.Label htmlFor="message_input"></MessagesEl.Label>
//    <MessagesEl.Input
//      id="message_input"
//      placeholder="Type message..."
//      ref={inputRef}
//    />
//    <MessagesEl.Button type="submit">Send</MessagesEl.Button>
//  </MessagesEl.Form>;

//  <Elements.Form onSubmit={handleSubmit} className="mr-1 ml-1">
//    <Elements.InputGroup>
//      <Elements.Label htmlFor="message_input"></Elements.Label>
//      <Elements.Input
//        id="message_input"
//        placeholder="Type message..."
//        ref={inputRef}
//        style={{ borderRadius: "3px" }}
//      />
//      <Elements.Button
//        type="submit"
//        className="pl-4 pr-4"
//        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
//      >
//        Send
//      </Elements.Button>
//    </Elements.InputGroup>
//  </Elements.Form>

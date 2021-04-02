import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";

const DELETE_MESSAGE_QUERY = gql`
  mutation($chatId: ID!, $messageId: ID!, $userId: ID!) {
    deleteMessage(chatId: $chatId, messageId: $messageId, userId: $userId) {
      id
    }
  }
`;

export function MessagePopover({ children, msg, userId, type, length, index }) {
  const [DeleteMessage] = useMutation(DELETE_MESSAGE_QUERY);
  const [isMounted, setIsMounted] = useState(false);

  const myRef = useRef();
  const myClick = useRef();

  let message;
  if (isMounted) {
    message = (
      <p
        ref={myRef.current}
        onClick={(e) => {
          e.preventDefault();
          myClick.current(e);
        }}
        style={
          index === length - 1
            ? type === "sent"
              ? {
                  borderBottomRightRadius: 0,
                }
              : {
                  borderBottomLeftRadius: 0,
                }
            : {}
        }
        className={`message ${
          type === "sent" ? "user_messages" : "others_messages"
        }`}
      >
        {children}
      </p>
    );
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    myRef.current = ref;
    myClick.current = onClick;
    return <></>;
  });
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
    // eslint-disable-next-line
  }, [myRef.current]);

  const handleDeleteMessage = async () => {
    try {
      const { chatId, id } = msg;
      const { data } = await DeleteMessage({
        variables: { chatId, messageId: id, userId },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {message}
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.ItemText>Actions</Dropdown.ItemText>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item disabled={true}>Reply</Dropdown.Item>
          <Dropdown.Item disabled={true}>Like</Dropdown.Item>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item onClick={handleDeleteMessage}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

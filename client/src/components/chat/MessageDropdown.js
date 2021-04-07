import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { MessagesEl } from "./MessagesElements";

const DELETE_MESSAGE_QUERY = gql`
  mutation($chatId: ID!, $messageId: ID!, $userId: ID!) {
    deleteMessage(chatId: $chatId, messageId: $messageId, userId: $userId) {
      id
    }
  }
`;

export function MessageDropdown({ msg, userId, type, length, index }) {
  const [DeleteMessage] = useMutation(DELETE_MESSAGE_QUERY);
  const [isMounted, setIsMounted] = useState(false);

  const dropdownToggleRef = useRef();
  const dropdownToggleClick = useRef();

  let message;
  if (isMounted) {
    message = (
      <MessagesEl.Message
        type={type}
        borderR={index === length - 1 && type}
        ref={dropdownToggleRef.current}
        // onClick={(e) => {
        //   e.preventDefault();
        //   dropdownToggleClick.current(e);
        // }}
        onDoubleClick={(e) => {
          e.preventDefault();
          dropdownToggleClick.current(e);
        }}
      >
        {msg.text}
      </MessagesEl.Message>
    );
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    dropdownToggleRef.current = ref;
    dropdownToggleClick.current = onClick;
    return <></>;
  });
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
    // eslint-disable-next-line
  }, [dropdownToggleRef.current]);

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
          <Dropdown.Header>Actions</Dropdown.Header>
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

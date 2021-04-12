import { gql, useMutation } from "@apollo/client";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import moment from "moment";
import { MessagesEl } from "./MessagesElements";
import { StyledDropdown, DropdownEl } from "../DropdownElements";

const DELETE_MESSAGE_QUERY = gql`
  mutation($chatId: ID!, $messageId: ID!, $userId: ID!) {
    deleteMessage(chatId: $chatId, messageId: $messageId, userId: $userId) {
      id
    }
  }
`;

const myUTC = new Date().getUTCDate();
export function Message({ msg, userId, type, length, index }) {
  const [DeleteMessage] = useMutation(DELETE_MESSAGE_QUERY);
  const time = new Date(Number(msg.createdAt)).toISOString();

  const handleDeleteMessage = async () => {
    try {
      const { chatId, id } = msg;
      await DeleteMessage({
        variables: { chatId, messageId: id, userId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {type === "received" && (
        <MessagesEl.Message type={type} borderR={index === length - 1 && type}>
          {msg.text}
        </MessagesEl.Message>
      )}
      <StyledDropdown type={type}>
        <RiArrowDropDownLine size={20} />
        <DropdownEl.Header>
          {"Sent at "}
          {moment(time).utc(myUTC).format("MMM Do YYYY, h:mm a")}
        </DropdownEl.Header>
        <DropdownEl.Divider></DropdownEl.Divider>
        <DropdownEl.Item disabled={true}>Like</DropdownEl.Item>
        <DropdownEl.Item disabled={true}>Reply</DropdownEl.Item>
        <DropdownEl.Item disabled={true}>Forward</DropdownEl.Item>
        <DropdownEl.Divider></DropdownEl.Divider>
        <DropdownEl.Item onClick={handleDeleteMessage}>Delete</DropdownEl.Item>
      </StyledDropdown>
      {type === "sent" && (
        <MessagesEl.Message type={type} borderR={index === length - 1 && type}>
          {msg.text}
        </MessagesEl.Message>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gql, useMutation, useSubscription } from "@apollo/client";

import { ChatAddUser } from "./ChatAddUser";
import ChatUsersDropdown from "./ChatUsersDropdown";
import { ChatUsersEl } from "./ChatUsersElements";
import { FaSearchengin } from "react-icons/fa";

const CHAT_USERS_QUERY = gql`
  subscription($chatId: ID!) {
    chatUsers(chatId: $chatId) {
      chatName
      users {
        id
        email
        lastName
        firstName
      }
    }
  }
`;

const SEARCHED_CHAT_USERS = gql`
  mutation($username: String!, $chatId: ID!) {
    searchedChatUsers(username: $username, chatId: $chatId) {
      id
      email
      lastName
      firstName
    }
  }
`;

export default function ChatUsers({
  chatId,
  currentUserId,
  inputId,
  isAuthorizedChat,
}) {
  const { data, error } = useSubscription(CHAT_USERS_QUERY, {
    variables: { chatId },
  });

  const [chatUsers, setChatUsers] = useState([]);
  const [SearchedChatUsers] = useMutation(SEARCHED_CHAT_USERS);
  const [searchedUsername, setSearchedUsername] = useState("");

  const handleSearchedChatUsers = async (e) => {
    try {
      const username = e.currentTarget.value;
      setSearchedUsername(username);
      const { data } = await SearchedChatUsers({
        variables: { username, chatId },
      });
      if (data) {
        setChatUsers(data.searchedChatUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      setChatUsers(data.chatUsers.users);
    }
  }, [data]);

  if (!data) return null;
  if (error) return console.log(error);

  return (
    <ChatUsersEl.Container>
      <ChatUsersEl.Header>
        <ChatUsersEl.Label htmlFor={`search_user_input-${inputId}`}>
          <FaSearchengin />
        </ChatUsersEl.Label>
        <ChatUsersEl.Input
          id={`search_user_input-${inputId}`}
          placeholder={`Users...`}
          onChange={handleSearchedChatUsers}
        />
        <ChatUsersEl.InputIcon>
          <ChatAddUser chatId={chatId} />
        </ChatUsersEl.InputIcon>
      </ChatUsersEl.Header>

      <ChatUsersEl.Menu>
        {!isAuthorizedChat ? null : chatUsers.length >= 1 ? (
          chatUsers
            .filter((chatUser) => chatUser.id !== currentUserId)
            .map((chatUser) => (
              <ChatUsersEl.SubMenu key={chatUser.id}>
                <ChatUsersEl.Avatar
                  rounded
                  src="https://source.unsplash.com/user/erondu"
                />
                <ChatUsersEl.Item>
                  <ChatUsersDropdown
                    chatId={chatId}
                    otherUserId={chatUser.id}
                  />
                </ChatUsersEl.Item>
                <ChatUsersEl.Item>
                  <NavLink to={`/user/${chatUser.id}`}>
                    {`${chatUser.firstName} ${chatUser.lastName}`}
                  </NavLink>
                </ChatUsersEl.Item>
              </ChatUsersEl.SubMenu>
            ))
        ) : searchedUsername ? (
          <ChatUsersEl.Item>{`No user in this chatroom with a name: ${searchedUsername}`}</ChatUsersEl.Item>
        ) : (
          <ChatUsersEl.Item>No one in this chatroom...</ChatUsersEl.Item>
        )}
      </ChatUsersEl.Menu>
    </ChatUsersEl.Container>
  );
}

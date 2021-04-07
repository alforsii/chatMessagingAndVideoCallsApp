import React from "react";
import { gql, useSubscription } from "@apollo/client";
import AddChatUser from "./AddChatUser";
import { NavLink } from "react-router-dom";
import ChatUsersDropdown from "./ChatUsersDropdown";
import { ChatUsersEl } from "./ChatUsersElements";
import StyledAvatar from "../Avatar";
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

export default function ChatUsers({ chatId, currentUserId, chats }) {
  const { data, error } = useSubscription(CHAT_USERS_QUERY, {
    variables: { chatId },
  });

  if (!data) return null;
  if (error) return console.log(error);
  const isInChatUsers = chats?.map((user) => user.id).includes(chatId);

  const chatUsers = data?.chatUsers?.users || [];
  return (
    <ChatUsersEl.Container>
      <ChatUsersEl.Header>
        <ChatUsersEl.Label htmlFor="search_user_input">
          <FaSearchengin />
        </ChatUsersEl.Label>
        <ChatUsersEl.Input id="search_user_input" placeholder={`Users...`} />
        <ChatUsersEl.InputIcon>
          <AddChatUser chatId={chatId} />
        </ChatUsersEl.InputIcon>
      </ChatUsersEl.Header>

      <ChatUsersEl.Menu>
        {!isInChatUsers ? null : chatUsers?.length >= 2 ? (
          chatUsers
            .filter((chatUser) => chatUser.id !== currentUserId)
            .map((chatUser) => (
              <ChatUsersEl.SubMenu key={chatUser.id}>
                <ChatUsersEl.Avatar>
                  <StyledAvatar
                    rounded
                    style={{ width: "100%", height: "100%" }}
                    src="https://source.unsplash.com/user/erondu"
                  />
                </ChatUsersEl.Avatar>
                <ChatUsersEl.Item>
                  <NavLink to={`/user/${chatUser.id}`}>
                    {`${chatUser.firstName} ${chatUser.lastName}`}
                  </NavLink>
                </ChatUsersEl.Item>
                <ChatUsersEl.Item>
                  <ChatUsersDropdown
                    chatId={chatId}
                    otherUserId={chatUser.id}
                  />
                </ChatUsersEl.Item>
              </ChatUsersEl.SubMenu>
            ))
        ) : (
          <div>
            <p>{`No users in the Chat!`}</p>
          </div>
        )}
      </ChatUsersEl.Menu>
    </ChatUsersEl.Container>
  );
}

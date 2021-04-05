import React, { useEffect, useState } from "react";
import { gql, useSubscription } from "@apollo/client";
import { NavLink } from "react-router-dom";
import CreateChat from "./CreateChat";
import UserChatsDropdown from "./UserChatsDropdown";
import { UserChatsEl } from "./UserChatsElements";
import { AiFillWechat } from "react-icons/ai";
import { FaSearchengin } from "react-icons/fa";

const USER_CHATS_QUERY = gql`
  subscription($userId: ID!) {
    userChats(userId: $userId) {
      id
      chatName
    }
  }
`;

export default function UserChats({ userId, updateState }) {
  const { data, error } = useSubscription(USER_CHATS_QUERY, {
    variables: { userId },
  });
  const [activeBtn, setActiveBtn] = useState(null);

  useEffect(() => {
    updateState({ chats: data?.userChats });
    // eslint-disable-next-line
  }, [data?.userChats]);

  if (!data) return null;
  if (error) return console.log(error);

  return (
    <UserChatsEl.Container>
      <UserChatsEl.Header>
        <UserChatsEl.Label htmlFor="search_chat_input">
          <FaSearchengin />
        </UserChatsEl.Label>
        <UserChatsEl.Input id="search_chat_input" placeholder={`Chats...`} />
        <CreateChat />
      </UserChatsEl.Header>
      <UserChatsEl.Menu>
        {data.userChats?.map((chat) => (
          <UserChatsEl.SubMenu key={chat.id}>
            <UserChatsEl.Item>
              <AiFillWechat />
            </UserChatsEl.Item>
            <NavLink to={`/chat/${chat.id}`}>
              <UserChatsEl.Item
                id={chat.id}
                className={chat.id === activeBtn && "active"}
                onClick={() => setActiveBtn(chat.id)}
              >
                {chat.chatName}
              </UserChatsEl.Item>
            </NavLink>
            <UserChatsEl.Item>
              <UserChatsDropdown chatId={chat.id} chatName={chat.chatName} />
            </UserChatsEl.Item>
          </UserChatsEl.SubMenu>
        ))}
      </UserChatsEl.Menu>
    </UserChatsEl.Container>
  );
}

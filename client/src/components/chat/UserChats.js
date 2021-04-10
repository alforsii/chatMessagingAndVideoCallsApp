import React, { useEffect, useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { NavLink } from "react-router-dom";
import CreateChat from "./CreateChat";
import UserChatsDropdown from "./UserChatsDropdown";
import { UserChatsEl } from "./UserChatsElements";
import { FaSearchengin } from "react-icons/fa";

const USER_CHATS_QUERY = gql`
  subscription($userId: ID!) {
    userChats(userId: $userId) {
      id
      chatName
    }
  }
`;

const SEARCH_CHAT_QUERY = gql`
  mutation($chatName: String!, $userId: ID!) {
    searchedChats(chatName: $chatName, userId: $userId) {
      id
      chatName
    }
  }
`;

export default function UserChats({ userId, updateState, inputId }) {
  const [SearchedChats] = useMutation(SEARCH_CHAT_QUERY);
  const { data, error } = useSubscription(USER_CHATS_QUERY, {
    variables: { userId },
  });
  const [activeBtn, setActiveBtn] = useState(null);
  const [userChats, setUserChats] = useState([]);
  const [searchChatName, setSearchChatName] = useState("");

  const handleSearchedChats = async (e) => {
    try {
      const chatName = e.currentTarget.value;
      setSearchChatName(chatName);
      const { data } = await SearchedChats({ variables: { chatName, userId } });
      if (data) {
        setUserChats(data.searchedChats);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      setUserChats(data.userChats);
      updateState({ chats: data.userChats });
    }
    // eslint-disable-next-line
  }, [data]);

  if (!data) return null;
  if (error) return console.log(error);

  return (
    <UserChatsEl.Container>
      <UserChatsEl.Header>
        <UserChatsEl.Label htmlFor={`search_chat_input-${inputId}`}>
          <FaSearchengin />
        </UserChatsEl.Label>
        <UserChatsEl.Input
          id={`search_chat_input-${inputId}`}
          placeholder={`Chats...`}
          onChange={handleSearchedChats}
          autoComplete={"false"}
          autoSave="false"
        />
        <UserChatsEl.InputIcon>
          <CreateChat />
        </UserChatsEl.InputIcon>
      </UserChatsEl.Header>
      <UserChatsEl.Menu>
        {userChats?.length > 0 ? (
          userChats?.map((chat) => (
            <UserChatsEl.SubMenu key={chat.id}>
              <UserChatsEl.Item>
                <UserChatsDropdown chatId={chat.id} chatName={chat.chatName} />
              </UserChatsEl.Item>
              <NavLink to={`/chat/${chat.id}`}>
                <UserChatsEl.Item
                  id={chat.id}
                  className={chat.id === activeBtn && "active"}
                  onClick={() => {
                    setActiveBtn(chat.id);
                    updateState({ showChats: false });
                  }}
                >
                  {chat.chatName}
                </UserChatsEl.Item>
              </NavLink>
            </UserChatsEl.SubMenu>
          ))
        ) : searchChatName ? (
          <UserChatsEl.Item>
            {`You don't have a chat with a name: ${searchChatName}`}
          </UserChatsEl.Item>
        ) : (
          <UserChatsEl.Item>You don't have a single chat...</UserChatsEl.Item>
        )}
      </UserChatsEl.Menu>
    </UserChatsEl.Container>
  );
}

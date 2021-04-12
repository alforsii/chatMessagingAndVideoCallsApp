import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa";
import CreateChat from "./CreateChat";
import UserChatsDropdown from "./UserChatsDropdown";
import { UserChatsEl } from "./UserChatsElements";
import { StyledLoader } from "../StyledLoader";

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
  const { data, error, loading } = useSubscription(USER_CHATS_QUERY, {
    variables: { userId },
  });
  const [activeBtn, setActiveBtn] = useState(null);
  const [userChats, setUserChats] = useState([]);
  const searchRef = useRef();

  const handleSearchedChats = async (e) => {
    try {
      const { data } = await SearchedChats({
        variables: { chatName: searchRef.current.value, userId },
      });
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

  if (error) console.log(error);

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
          ref={searchRef}
          autoComplete="off"
          disabled={loading}
        />
        <UserChatsEl.InputIcon>
          <CreateChat />
        </UserChatsEl.InputIcon>
      </UserChatsEl.Header>
      <UserChatsEl.Menu>
        {loading ? (
          <StyledLoader />
        ) : !data ? null : userChats?.length > 0 ? (
          userChats?.map((chat) => (
            <UserChatsEl.SubMenu key={chat.id}>
              <UserChatsEl.Item>
                <UserChatsDropdown chatId={chat.id} chatName={chat.chatName} />
              </UserChatsEl.Item>
              <NavLink
                to={{
                  pathname: `/chat/${chat.id}`,
                  state: chat.chatName,
                }}
              >
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
        ) : searchRef.current?.value ? (
          <UserChatsEl.Item>
            {`You don't have a chat with a name: ${searchRef.current?.value}`}
          </UserChatsEl.Item>
        ) : (
          <UserChatsEl.Item>You don't have a single chat...</UserChatsEl.Item>
        )}
      </UserChatsEl.Menu>
    </UserChatsEl.Container>
  );
}

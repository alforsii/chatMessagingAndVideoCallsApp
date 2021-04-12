import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { StyledModal } from "../Modal";
import { ChatAddUserForm } from "./ChatAddUserForm";

// otherUserId, chatId
const ADD_CHAT_USER_QUERY = gql`
  mutation($authorId: ID!, $otherUserId: ID!, $chatId: ID!) {
    addChatUser(
      authorId: $authorId
      otherUserId: $otherUserId
      chatId: $chatId
    ) {
      id
      chatName
    }
  }
`;
const SEARCHED_USER_QUERY = gql`
  mutation($email: String!) {
    searchedUser(email: $email) {
      id
      email
      lastName
      firstName
    }
  }
`;

export function ChatAddUser({ chatId }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [AddUser] = useMutation(ADD_CHAT_USER_QUERY);

  const [SearchedUser] = useMutation(SEARCHED_USER_QUERY);

  const handleSearchInput = async (e) => {
    try {
      setSearchInput(e.target.value);
      const { data, errors } = await SearchedUser({
        variables: { email: e.target.value },
      });
      if (!data) return setMessage("No user found!");
      if (errors?.length) return setMessage(errors[0].message);

      setFoundUser(data.searchedUser);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Consumer>
      {(ctx) => {
        const handleAddUser = async (e) => {
          e.preventDefault();
          if (!foundUser) return null;
          try {
            const { data, errors } = await AddUser({
              variables: {
                authorId: ctx.state.user.id,
                otherUserId: foundUser.id,
                chatId,
              },
            });
            if (!data) return null;
            if (errors?.length) return setMessage(errors[0].message);

            const { id, firstName } = foundUser;

            ctx.updateState({
              alertMessage: `${firstName} was added to the chat: ${data.addChatUser.chatName}!`,
              alertSuccess: true,
              alertMessageId: id,
            });
            setShow(false);
            setSearchInput("");
          } catch (err) {
            console.log(err);
            setMessage(err.message);
          }
        };
        return (
          <StyledModal
            title="Add user | to chatroom"
            modalName="Add_user_modal"
            show={show}
            setShow={setShow}
            onHide={() => setShow(false)}
          >
            <ChatAddUserForm
              handleAddUser={handleAddUser}
              handleSearchInput={handleSearchInput}
              searchInput={searchInput}
              foundUser={foundUser}
              setShow={setShow}
              message={message}
            />
          </StyledModal>
        );
      }}
    </AuthContext.Consumer>
  );
}

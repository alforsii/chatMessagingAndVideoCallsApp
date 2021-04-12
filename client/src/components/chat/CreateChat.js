import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { StyledModal } from "../Modal";
import { CreateChatForm } from "./CreateChatForm";
import { errorAlert } from "../../global/globalHelpers";

const NEW_CHAT_QUERY = gql`
  mutation($userId: ID!, $chatName: String!) {
    createChat(userId: $userId, chatName: $chatName) {
      id
      chatName
    }
  }
`;

export default function CreateChat() {
  const [CreateChat] = useMutation(NEW_CHAT_QUERY);
  const [smShow, setSmShow] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [chatName, setChatName] = useState("");

  return (
    <AuthContext.Consumer>
      {(ctx) => {
        const handleCreateChat = async (e) => {
          e.preventDefault();
          try {
            if (!chatName) return setErrMessage("Type a name!");
            if (!ctx.state.user.id) return ctx.logout();

            if (chatName.length < 4 || chatName.length > 15) {
              ctx.updateState(
                errorAlert(`Chat name must be between 4 and 15 chars!`, true)
              );
              return;
            }

            const { data, errors } = await CreateChat({
              variables: { chatName, userId: ctx.state.user.id },
            });
            if (errors?.length) {
              return setErrMessage(errors[0].message);
            }
            if (!data) {
              return setErrMessage("Something went wrong!");
            }

            ctx.updateState({
              alertMessage: `New ${data.createChat.chatName} chat created!`,
              alertSuccess: true,
              alertMessageId: data.createChat.id,
              chats: [...ctx.state.chats, data?.createChat],
            });

            setChatName("");
            setSmShow(false);
          } catch (err) {
            console.log(err);
          }
        };

        return (
          <>
            <StyledModal
              // size="sm"
              show={smShow}
              modalName="Create_chat_modal"
              title="Create Chat"
              setShow={setSmShow}
              onHide={() => {
                setErrMessage("");
                setSmShow(false);
              }}
            >
              <CreateChatForm
                chatName={chatName}
                message={errMessage}
                handleCreateChat={handleCreateChat}
                onChange={(e) => {
                  setErrMessage("");
                  setChatName(e.target.value);
                }}
              />
            </StyledModal>
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}

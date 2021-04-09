import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { successAlert, errorAlert } from "../../global/globalHelpers";
import { StyledModal } from "./Modal";
import { FormEl } from "./FormElements";

const UPDATE_CHAT_QUERY = gql`
  mutation($chatId: ID!, $authorId: ID!, $chatName: String!) {
    updateChat(chatId: $chatId, authorId: $authorId, chatName: $chatName) {
      id
      chatName
    }
  }
`;

export const UserChatUpdate = ({
  chatId,
  history,
  chatName: theChatName,
  setShowUpdateModal,
  showUpdateModal,
  ctx,
}) => {
  const [UpdateChat] = useMutation(UPDATE_CHAT_QUERY);
  const [chatName, setChatName] = useState(theChatName);

  const handleUpdateChat = async (e) => {
    e.preventDefault();
    setShowUpdateModal(false);
    try {
      if (!chatName) {
        return;
      }

      const { data, errors } = await UpdateChat({
        variables: { chatId, authorId: ctx.state.user.id, chatName },
      });
      if (!data) return console.log("No data");
      if (errors?.length) {
        return ctx.updateState(errorAlert(errors[0].message), true);
      }

      ctx.updateState(successAlert("ChatName Updated!"));
      history.push("/chat");
    } catch (err) {
      ctx.updateState(errorAlert(err.message, true));
      console.log(err);
    }
  };

  return (
    <StyledModal
      size="md"
      show={showUpdateModal}
      showBadge={false}
      onHide={() => {
        setShowUpdateModal(false);
      }}
      title="Update | Chat name"
      modalName="Chat_update_modal"
    >
      <FormEl.Form onSubmit={handleUpdateChat}>
        <FormEl.InputGroup className="mb-2 mr-sm-2">
          <FormEl.InputGroup.Prepend>
            <FormEl.InputGroup.Text>@</FormEl.InputGroup.Text>
          </FormEl.InputGroup.Prepend>
          <FormEl.Input
            onChange={(e) => {
              setChatName(e.target.value);
            }}
            value={chatName}
            placeholder="ChatName..."
            autoFocus
          />
          <FormEl.Button variant="success" type="submit">
            Update
          </FormEl.Button>
        </FormEl.InputGroup>
      </FormEl.Form>
    </StyledModal>
  );
};

import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";

import { successAlert, errorAlert } from "../../global/globalHelpers";
import { StyledModal } from "../Modal";

const DELETE_CHAT_QUERY = gql`
  mutation($chatId: ID!, $userId: ID!) {
    deleteChat(chatId: $chatId, userId: $userId) {
      id
      message
    }
  }
`;

export const UserChatDelete = ({
  chatId,
  history,
  showDeleteModal,
  setShowDeleteModal,
  ctx,
}) => {
  const [DeleteChat] = useMutation(DELETE_CHAT_QUERY);
  const handleDeleteChat = async () => {
    setShowDeleteModal(false);
    try {
      const userId = ctx.state.user.id;

      const { data, errors } = await DeleteChat({
        variables: { chatId, userId },
      });
      if (!data) return;
      if (errors?.length) {
        return ctx.updateState(errorAlert(errors[0].message, true));
      }

      ctx.updateState(successAlert(data.deleteChat.message));
      history.push("/chat");
    } catch (err) {
      console.log("🚀 err", err);
      ctx.updateState(errorAlert(err.message, true));
    }
  };

  return (
    <StyledModal
      size="md"
      show={showDeleteModal}
      showBadge={false}
      onHide={() => {
        setShowDeleteModal(false);
      }}
      title="By removing this chat all of your messages will also be
                  deleted! Are you sure?"
      modalName="Alert_chat_removal_modal"
    >
      <Button
        style={{ marginRight: "10px" }}
        variant="secondary"
        onClick={() => setShowDeleteModal(false)}
      >
        NO| Cancel
      </Button>
      <Button variant="danger" onClick={handleDeleteChat}>
        YES| Remove
      </Button>
    </StyledModal>
  );
};

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { StyledModal } from "./Modal";
import { DropdownEl, StyledDropdown } from "./DropdownElements";

import { AuthContext } from "../../context/AuthContext";

const DELETE_CHAT_USER_QUERY = gql`
  mutation($chatId: ID!, $authorId: ID!, $otherUserId: ID!) {
    deleteChatUser(
      chatId: $chatId
      authorId: $authorId
      otherUserId: $otherUserId
    ) {
      id
      message
    }
  }
`;

export const ChatUsersDropdown = ({ chatId, otherUserId, history }) => {
  const [DeleteChatUser] = useMutation(DELETE_CHAT_USER_QUERY);
  const [show, setShow] = useState(false);

  return (
    <AuthContext.Consumer>
      {(ctx) => {
        const handleDeleteChatUser = async () => {
          try {
            const { data, errors } = await DeleteChatUser({
              variables: { chatId, authorId: ctx.state.user.id, otherUserId },
            });
            if (!data) return;
            if (errors?.length) {
              return ctx.updateState({
                alertMessage: errors[0].message,
                alertSuccess: false,
                alertMessageId: "Error",
              });
            }

            const alertMessage = data.deleteChatUser.message;

            // history.push("/chat");

            ctx.updateState({
              alertMessage,
              alertSuccess: false,
              alertMessageId: data.deleteChatUser.id,
            });
          } catch (err) {
            console.log("🚀 err", err);
            ctx.updateState({
              alertMessage: err.message,
              alertSuccess: false,
              alertMessageId: `error-${Math.random() + 1}`,
            });
          }
        };

        return (
          <React.Fragment>
            <StyledDropdown toggleText="•••">
              <DropdownEl.Item eventKey="0" disabled>
                Options
              </DropdownEl.Item>
              <DropdownEl.Item eventKey="1">Open user page</DropdownEl.Item>
              <DropdownEl.Divider />
              <DropdownEl.Item onClick={() => setShow(true)} eventKey="2">
                Remove user
              </DropdownEl.Item>
            </StyledDropdown>
            <StyledModal
              size="sm"
              show={show}
              showBadge={false}
              onHide={() => {
                setShow(false);
              }}
              title="Are you sure?"
              modalName="Alert_user_removal_modal"
            >
              <Button
                style={{ marginRight: 2 }}
                variant="secondary"
                onClick={() => setShow(false)}
              >
                NO| Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteChatUser}>
                YES| Remove
              </Button>
            </StyledModal>
          </React.Fragment>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default withRouter(ChatUsersDropdown);

import React from "react";
import { withRouter } from "react-router-dom";
import { NavbarCenterEl } from "./NavbarsElements";
import { AuthContext } from "../../context/AuthContext";
import { MessageTypingUsers } from "./MessageTypingUsers";

export const StyledNavbarCenter = withRouter(({ history, userId, chatId }) => {
  const chatName = history?.location?.state || "";
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <NavbarCenterEl.Container>
            <MessageTypingUsers
              userId={userId}
              chatId={chatId}
              chatName={chatName}
            />
          </NavbarCenterEl.Container>
        );
      }}
    </AuthContext.Consumer>
  );
});

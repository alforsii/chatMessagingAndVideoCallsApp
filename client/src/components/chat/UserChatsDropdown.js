import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { AiFillWechat } from "react-icons/ai";

import { AuthContext } from "../../context/AuthContext";
import { StyledDropdown, DropdownEl } from "../DropdownElements";
import { UserChatUpdate } from "./UserChatUpdate";
import { UserChatDelete } from "./UserChatDelete";

export const UserChatsDropdown = ({ chatId, chatName, history }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <React.Fragment>
            <StyledDropdown>
              <AiFillWechat size={20} />
              <DropdownEl.Item onClick={() => setShowUpdateModal(true)}>
                Rename
              </DropdownEl.Item>
              <DropdownEl.Divider />
              <DropdownEl.Item onClick={() => setShowDeleteModal(true)}>
                Remove
              </DropdownEl.Item>
            </StyledDropdown>

            <UserChatUpdate
              ctx={ctx}
              chatName={chatName}
              chatId={chatId}
              history={history}
              showUpdateModal={showUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
            />
            <UserChatDelete
              ctx={ctx}
              chatId={chatId}
              history={history}
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          </React.Fragment>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default withRouter(UserChatsDropdown);

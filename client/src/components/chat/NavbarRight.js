import React from "react";
import { withRouter } from "react-router-dom";
import { NavbarRightEl } from "./NavbarsElements";
import { AuthContext } from "../../context/AuthContext";
import { ModeButton } from "../navbar/ModeButton";
import { StyledDropdown, DropdownEl } from "../DropdownElements";
import { StyledAvatar } from "../Avatar";

export const StyledNavbarRight = withRouter(({ history, chatId }) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        const { logout, state, updateState } = ctx;
        const { token, user } = state;
        return (
          <NavbarRightEl.Container
            style={{
              position: !chatId ? "fixed" : "",
              right: "130px",
              top: "10px",
            }}
          >
            <NavbarRightEl.Title>{`Hi, ${user?.firstName} ${user.lastName}`}</NavbarRightEl.Title>

            {token && (
              <StyledDropdown toggleStyle={{ width: 35, height: 35 }}>
                <StyledAvatar
                  width={35}
                  height={35}
                  roundedCircle
                  src="https://source.unsplash.com/user/erondu"
                />
                <DropdownEl.Item>Profile</DropdownEl.Item>
                <DropdownEl.Item>Language</DropdownEl.Item>
                <ModeButton
                  updateState={updateState}
                  state={state}
                  title="Mode"
                />
                <DropdownEl.Item>Settings</DropdownEl.Item>
                <DropdownEl.Divider />
                <DropdownEl.Item onClick={() => logout()}>
                  Logout
                </DropdownEl.Item>
              </StyledDropdown>
            )}
          </NavbarRightEl.Container>
        );
      }}
    </AuthContext.Consumer>
  );
});

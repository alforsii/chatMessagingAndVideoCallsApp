import React from "react";
import { withRouter } from "react-router-dom";
import { NavbarLeftEl } from "./NavbarsElements";
import { AuthContext } from "../../context/AuthContext";

export const StyledNavbarLeft = withRouter(({ history }) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <NavbarLeftEl.Container>
            <NavbarLeftEl.Logo to="/">Chat</NavbarLeftEl.Logo>
          </NavbarLeftEl.Container>
        );
      }}
    </AuthContext.Consumer>
  );
});

import React from "react";
import { NavbarEl } from "./NavbarElements";

export default function StyledNavbar() {
  return (
    <NavbarEl.NavbarContainer>
      <NavbarEl.NavLogo to="/">MainBrand</NavbarEl.NavLogo>
      <NavbarEl.Nav>
        <NavbarEl.NavMenu>
          <NavbarEl.NavItem>
            <NavbarEl.NavLink to="/chat">Chats</NavbarEl.NavLink>
          </NavbarEl.NavItem>
          <NavbarEl.NavItem>
            <NavbarEl.NavLink to="/room">Rooms</NavbarEl.NavLink>
          </NavbarEl.NavItem>
          <NavbarEl.NavItem>
            <NavbarEl.NavLink to="/group">Groups</NavbarEl.NavLink>
          </NavbarEl.NavItem>
        </NavbarEl.NavMenu>
      </NavbarEl.Nav>
      <NavbarEl.NavbarActions>
        <NavbarEl.NavbarButton>Login</NavbarEl.NavbarButton>
        <NavbarEl.NavbarButton>Signup</NavbarEl.NavbarButton>
      </NavbarEl.NavbarActions>
    </NavbarEl.NavbarContainer>
  );
}

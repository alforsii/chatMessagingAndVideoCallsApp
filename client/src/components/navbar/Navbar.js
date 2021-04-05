import React from "react";
import { withRouter } from "react-router-dom";
import StyledPopover from "../popover/Popover";
import { FiMenu } from "react-icons/fi";
import { NavbarEl } from "./NavbarElements";
import { StyledDropMenu } from "./DropdownMenu";
import StyledAvatar from "../Avatar";

export function StyledNavbar({
  token,
  logout,
  username,
  history,
  updateState,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <NavbarEl.Container>
        <NavbarEl.Logo to="/">MainBrand</NavbarEl.Logo>
        <NavbarEl.Nav>
          <NavbarEl.Menu>
            {token ? (
              <>
                <StyledDropMenu
                  title="GoTo"
                  items={[
                    { to: "/chat", name: "Chats" },
                    { to: "/room", name: "Rooms" },
                    { to: "/group", name: "Groups" },
                  ]}
                ></StyledDropMenu>
              </>
            ) : null}
            <NavbarEl.Item>
              <NavbarEl.Link to="/about">About</NavbarEl.Link>
            </NavbarEl.Item>
            <NavbarEl.Item>
              <NavbarEl.Link to="/contact">Contact</NavbarEl.Link>
            </NavbarEl.Item>
            <StyledPopover message={"Hi!This is my popover tooltip:)"}>
              <NavbarEl.Item>ClickMe</NavbarEl.Item>
            </StyledPopover>
          </NavbarEl.Menu>
        </NavbarEl.Nav>
        <NavbarEl.Actions>
          {token ? (
            <NavbarEl.Button onClick={() => logout()}>Logout</NavbarEl.Button>
          ) : (
            <>
              <NavbarEl.Button onClick={() => history.push("/")}>
                Login
              </NavbarEl.Button>
              <NavbarEl.Button onClick={() => history.push("/signup")}>
                Signup
              </NavbarEl.Button>
            </>
          )}
        </NavbarEl.Actions>
        <StyledAvatar
          roundedCircle
          border={2}
          src="https://source.unsplash.com/user/erondu"
        />
        <NavbarEl.Mobil onClick={updateState}>
          <FiMenu />
        </NavbarEl.Mobil>
      </NavbarEl.Container>
    </React.Fragment>
  );
}

export default withRouter(StyledNavbar);
import React from "react";
import { SidebarEl } from "./SidebarElements";
import { FaTimes } from "react-icons/fa";

export default function StyledSidebar({ isOpen, updateState }) {
  return (
    <SidebarEl.Container dark={false} isOpen={isOpen}>
      <SidebarEl.Header>Styled Sidebar</SidebarEl.Header>
      <SidebarEl.CloseIcon onClick={() => updateState({ isOpen: false })}>
        <FaTimes size={20} />
      </SidebarEl.CloseIcon>
      <SidebarEl.Menu>
        <SidebarEl.Link to="/chat">Chats</SidebarEl.Link>
        <SidebarEl.Link to="/room">Rooms</SidebarEl.Link>
        <SidebarEl.Link to="/group">Groups</SidebarEl.Link>
      </SidebarEl.Menu>
      <SidebarEl.Footer>
        <SidebarEl.Button>Login</SidebarEl.Button>
        <SidebarEl.Button>Signup</SidebarEl.Button>
        <SidebarEl.Button>Logout</SidebarEl.Button>
      </SidebarEl.Footer>
    </SidebarEl.Container>
  );
}

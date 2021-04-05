import React from "react";
import { ChatSidebarEl } from "./ChatSidebarElements";
import { AiFillWechat } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";

const iconSize = 24;
export function StyledChatSidebar() {
  return (
    <ChatSidebarEl.Container>
      <ChatSidebarEl.Icon>
        <AiFillWechat size={iconSize} />
      </ChatSidebarEl.Icon>
      <ChatSidebarEl.Icon>
        <FaUserFriends size={iconSize} />
      </ChatSidebarEl.Icon>
    </ChatSidebarEl.Container>
  );
}

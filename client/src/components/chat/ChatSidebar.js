import React from "react";
import { ChatSidebarEl } from "./ChatSidebarElements";
import { AiFillWechat } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";

const iconSize = 30;
export function StyledChatSidebar({ updateState, state }) {
  return (
    <ChatSidebarEl.Container>
      <ChatSidebarEl.Icon
        onClick={() =>
          updateState({
            showChats: !state.showChats,
            showUsers: false,
          })
        }
      >
        <AiFillWechat size={iconSize} />
      </ChatSidebarEl.Icon>
      <ChatSidebarEl.Icon
        onClick={() =>
          updateState({
            showUsers: !state.showUsers,
            showChats: false,
          })
        }
      >
        <FaUserFriends size={iconSize} />
      </ChatSidebarEl.Icon>
    </ChatSidebarEl.Container>
  );
}

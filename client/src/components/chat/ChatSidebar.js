import React from "react";
import { AiFillWechat } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { ChatSidebarEl } from "./ChatSidebarElements";

const iconSize = 30;
export function StyledChatSidebar({ updateState, state, display }) {
  return (
    <ChatSidebarEl.Container>
      <ChatSidebarEl.Icon
        onClick={() =>
          updateState({
            showChats: !state.showChats,
            showUsers: false,
          })
        }
        style={{ display }}
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
        style={{ display }}
      >
        <FaUserFriends size={iconSize} />
      </ChatSidebarEl.Icon>
    </ChatSidebarEl.Container>
  );
}

import { Messages } from "./Messages";
import UserChats from "./UserChats";
import ChatUsers from "./ChatUsers";
import { StyledChatSidebar } from "./ChatSidebar";

import { ChatEl } from "./ChatElements";
import { useEffect, useState } from "react";

export default function Chat(props) {
  const chatId = props?.match?.params?.id;
  const { state, updateState } = props;
  const { user, chats, isOpen } = state;
  const { id: userId } = user;
  const [width, setWidth] = useState("");

  function handleResize() {
    if (window.innerWidth < 668) {
      setWidth("sm");
    }
    if (window.innerWidth >= 668 && window.innerWidth < 900) {
      setWidth("md");
    }
    if (window.innerWidth > 900) {
      setWidth("lg");
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }
  useEffect(() => {
    handleResize();
    // eslint-disable-next-line
  }, []);

  return (
    <ChatEl.Container id="chat_container" isOpen={isOpen}>
      <ChatEl.Row>
        <StyledChatSidebar updateState={updateState} state={state} />
        <ChatEl.Col>
          {state.showUsers && width === "md" ? (
            <ChatUsers
              chats={chats}
              chatId={chatId}
              currentUserId={userId}
              inputId={1}
            />
          ) : (
            <UserChats updateState={updateState} userId={userId} inputId={1} />
          )}
        </ChatEl.Col>
        <ChatEl.Col>
          {state.showChats && width === "sm" ? (
            <UserChats updateState={updateState} userId={userId} inputId={2} />
          ) : state.showUsers && width === "sm" ? (
            <ChatUsers
              chats={chats}
              chatId={chatId}
              currentUserId={userId}
              inputId={2}
            />
          ) : (
            <Messages user={user} chatId={chatId} userId={userId} />
          )}
        </ChatEl.Col>
        <ChatEl.Col style={{ flex: chatId ? 1 : 0 }}>
          <ChatUsers
            chats={chats}
            chatId={chatId}
            currentUserId={userId}
            inputId={3}
          />
        </ChatEl.Col>
      </ChatEl.Row>
    </ChatEl.Container>
  );
}

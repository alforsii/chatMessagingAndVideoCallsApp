import { Messages } from "./Messages";
import UserChats from "./UserChats";
import ChatUsers from "./ChatUsers";
import { StyledChatSidebar } from "./ChatSidebar";

import { ChatEl } from "./ChatElements";

export default function Chat(props) {
  const chatId = props?.match?.params?.id;
  const { state, updateState } = props;
  const { user, chats, isOpen } = state;
  const { id: userId } = user;

  return (
    <ChatEl.Container id="chat_container" isOpen={isOpen}>
      <ChatEl.Row>
        <StyledChatSidebar />
        <ChatEl.Col>
          <UserChats updateState={updateState} userId={userId} />
        </ChatEl.Col>
        <ChatEl.Col>
          <ChatUsers chats={chats} chatId={chatId} currentUserId={userId} />
        </ChatEl.Col>
        <ChatEl.Col style={{ flex: 2 }}>
          <Messages user={user} chatId={chatId} userId={userId} />
        </ChatEl.Col>
      </ChatEl.Row>
    </ChatEl.Container>
  );
}

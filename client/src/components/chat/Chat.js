import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import UserChats from "./UserChats";
import ChatUsers from "./ChatUsers";
import { Messages } from "./Messages";
import { StyledChatSidebar } from "./ChatSidebar";
import { StyledNavbarLeft } from "./NavbarLeft";
import { StyledNavbarRight } from "./NavbarRight";
import { StyledNavbarCenter } from "./NavbarCenter";
import { ChatEl } from "./ChatElements";
// import { ChatOnlineUsers } from "./ChatOnlineUsers";

const USER_ONLINE_QUERY = gql`
  mutation(
    $userId: ID!
    $chatId: ID!
    $firstName: String!
    $lastName: String!
    $image: String
  ) {
    userOnline(
      userId: $userId
      chatId: $chatId
      firstName: $firstName
      lastName: $lastName
      image: $image
    )
  }
`;
const USER_OFFLINE_QUERY = gql`
  mutation($userId: ID!, $chatId: ID!) {
    userOffline(userId: $userId, chatId: $chatId)
  }
`;

export function Chat(props) {
  const [UserOnline] = useMutation(USER_ONLINE_QUERY);
  const [UserOffline] = useMutation(USER_OFFLINE_QUERY);

  const chatId = props?.match?.params?.id;
  const { state, updateState } = props;
  const { user, chats, isOpen } = state;
  const { id: userId } = user;
  // const [width, setWidth] = useState("");
  const isAuthorizedChat = chatId
    ? chats?.map((chat) => chat.id).includes(chatId)
    : false;

  const handleUserOnline = async () => {
    try {
      if (chatId) {
        // eslint-disable-next-line
        const { firstName, lastName, image, id } = user;
        console.log("🚀 ~ user", user);
        await UserOnline({
          variables: {
            userId: id,
            chatId,
            firstName,
            lastName,
            image: "https://source.unsplash.com/user/erondu",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUserOffline = async () => {
    try {
      if (chatId) {
        await UserOffline({ variables: { userId, chatId } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleUserOnline();
    return () => {
      handleUserOffline();
    };
    // eslint-disable-next-line
  }, [chatId]);

  // function handleResize() {
  //   if (window.innerWidth < 950) {
  //     setWidth("sm");
  //   }
  //   if (window.innerWidth >= 950 && window.innerWidth < 1026) {
  //     setWidth("md");
  //   }
  //   if (window.innerWidth > 1026) {
  //     setWidth("lg");
  //   }
  // }
  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  //   // eslint-disable-next-line
  // }, []);

  return (
    <ChatEl.Container id="chat_container" isOpen={isOpen}>
      <ChatEl.Row>
        <StyledChatSidebar updateState={updateState} state={state} />
        <ChatEl.Col
          style={{
            flex: !chatId ? 0.75 : 1,
          }}
        >
          <StyledNavbarLeft />
          <UserChats updateState={updateState} userId={userId} inputId={1} />
        </ChatEl.Col>
        <ChatEl.Col style={{ display: chatId ? "block" : "none" }}>
          <StyledNavbarCenter chatId={chatId} userId={userId} />
          <Messages
            isAuthorizedChat={isAuthorizedChat}
            user={user}
            chatId={chatId}
            userId={userId}
          />
        </ChatEl.Col>
        <ChatEl.Col style={{ flex: chatId ? 1 : 0 }}>
          <StyledNavbarRight chatId={chatId} />
          <ChatUsers
            isAuthorizedChat={isAuthorizedChat}
            chatId={chatId}
            currentUserId={userId}
            inputId={3}
          />
        </ChatEl.Col>
        <StyledChatSidebar
          display="none"
          updateState={updateState}
          state={state}
        />
      </ChatEl.Row>
    </ChatEl.Container>
  );
}

import { gql, useSubscription } from "@apollo/client";
import { useState } from "react";
import { StyledAvatar } from "../Avatar";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { ChatOnlineUsersEl } from "./ChatOnlineUsersElements";
import { useEffect } from "react";

const ONLINE_CHAT_USERS = gql`
  subscription($chatId: ID!) {
    onlineUsers(chatId: $chatId) {
      id
      users {
        id
        firstName
        lastName
        image
      }
    }
  }
`;

export function ChatOnlineUsers({ chatId }) {
  const { data, error } = useSubscription(ONLINE_CHAT_USERS, {
    variables: { chatId },
  });
  const [rightFooterHeight, setRightFooterHeight] = useState(5);
  const numberOfUsers = data?.onlineUsers?.users?.length;
  useEffect(() => {
    if (numberOfUsers) {
      setRightFooterHeight(20);
    } else {
      setRightFooterHeight(5);
    }
    // eslint-disable-next-line
  }, [data]);
  console.log(data);
  console.log(error);
  return (
    <ChatOnlineUsersEl.Container height={rightFooterHeight}>
      <ChatOnlineUsersEl.Button
        onClick={() => {
          rightFooterHeight === 5 || rightFooterHeight === 20
            ? setRightFooterHeight(100)
            : setRightFooterHeight(5);
        }}
      >
        Online Users
        {rightFooterHeight === 100 ? (
          <RiArrowDropDownLine size={24} />
        ) : (
          <RiArrowDropUpLine size={24} />
        )}
        {numberOfUsers && `${numberOfUsers}`}
      </ChatOnlineUsersEl.Button>
      <ChatOnlineUsersEl.Menu>
        {data &&
          data?.onlineUsers?.users?.map((user) => (
            <ChatOnlineUsersEl.Item key={user.id}>
              <StyledAvatar
                width={35}
                height={35}
                roundedCircle
                src={user.image}
              />
              <ChatOnlineUsersEl.Text>{`${user.firstName} ${user.lastName}`}</ChatOnlineUsersEl.Text>
            </ChatOnlineUsersEl.Item>
          ))}
      </ChatOnlineUsersEl.Menu>
    </ChatOnlineUsersEl.Container>
  );
}

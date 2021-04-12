import { gql, useSubscription } from "@apollo/client";
import { useState } from "react";
import { StyledAvatar } from "../Avatar";

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

  console.log(data);
  console.log(error);
  return (
    <div
      style={{
        height: rightFooterHeight + "%",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <h4
        onClick={() => {
          rightFooterHeight !== 5
            ? setRightFooterHeight(5)
            : setRightFooterHeight(100);
        }}
        style={{ background: "gray", margin: 0, cursor: "pointer" }}
      >
        Online Users
      </h4>
      <div
        style={{
          height: "90%",
          width: "100%",
          background: "lightgreen",
          overflow: "scroll",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {rightFooterHeight !== 30 &&
          data &&
          data?.onlineUsers?.users?.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <StyledAvatar
                width={35}
                height={35}
                roundedCircle
                src={user.image}
              />
              <p style={{ color: "#000", margin: "2px", padding: 0 }}>
                {user.firstName}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

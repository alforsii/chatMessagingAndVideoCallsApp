import React, { useEffect, useState } from "react";
import { ImPencil } from "react-icons/im";
import { GiKeyboard } from "react-icons/gi";
import { gql, useSubscription } from "@apollo/client";
import styled from "styled-components";

const TYPING_USERS_QUERY = gql`
  subscription($chatId: ID!) {
    typingChatUsers(chatId: $chatId) {
      id
      users {
        id
        username
      }
    }
  }
`;

export function MessageTypingUsers({ chatId, userId, chatName }) {
  const { data } = useSubscription(TYPING_USERS_QUERY, {
    variables: { chatId },
  });
  const [typingUsers, setTypingUsers] = useState([]);
  //   if (error) console.log(error);

  useEffect(() => {
    if (data) {
      const allOtherUsers = data?.typingChatUsers?.users?.filter(
        (user) => user.id !== userId
      );
      setTypingUsers(allOtherUsers);
    } else {
      setTypingUsers([]);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <TypingUsers.Container>
      {!typingUsers?.length ? (
        <TypingUsers.Header>{chatName}</TypingUsers.Header>
      ) : (
        typingUsers?.map((user) => (
          <TypingUsers.Text key={user.id}>
            {`${user.username} is typing...`}
            <GiKeyboard />
            <ImPencil />
          </TypingUsers.Text>
        ))
      )}
    </TypingUsers.Container>
  );
}

const TypingUsers = {
  Container: styled.div`
    /* position: absolute; */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    /* z-index: 999; */
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  Text: styled.p`
    font-size: 12px;
  `,
  Header: styled.h4`
    color: #fff;
    text-transform: capitalize;
  `,
};

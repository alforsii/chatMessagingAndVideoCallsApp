import React from "react";
import moment from "moment";
import { MessageDropdown } from "./MessageDropdown";
import { MessagesEl } from "./MessagesElements";
import { useState } from "react";
import StyledAvatar from "../Avatar";

export default function GroupedMessages({ id, type, messages, name, userId }) {
  const [msgId, setMsgId] = useState("");

  return (
    <>
      {messages.map((msg, i) => {
        const time = new Date(Number(msg.createdAt)).toISOString();
        const myUTC = new Date().getUTCDate();
        return (
          <MessagesEl.Row
            key={msg.id}
            onMouseEnter={() => setMsgId(msg.id)}
            onMouseLeave={() => setMsgId("")}
            type={type}
          >
            {type === "sent" && (
              <MessagesEl.Time display={msg.id === msgId ? "block" : "none"}>
                {moment(time).utc(myUTC).format("MMM Do YYYY, h:mm a")}
              </MessagesEl.Time>
            )}
            <MessageDropdown
              userId={userId}
              msg={msg}
              type={type}
              length={messages.length}
              index={i}
            />
            {type === "received" && (
              <MessagesEl.Time display={msg.id === msgId ? "block" : "none"}>
                {moment(time).utc(myUTC).format("MMM Do YYYY, h:mm a")}
              </MessagesEl.Time>
            )}
          </MessagesEl.Row>
        );
      })}
      {type === "received" && (
        <MessagesEl.Row>
          <StyledAvatar
            width={35}
            height={35}
            src="https://source.unsplash.com/user/erondu"
            roundedCircle
          />
          <MessagesEl.Text type={type}>{name}</MessagesEl.Text>
        </MessagesEl.Row>
      )}
    </>
  );
}

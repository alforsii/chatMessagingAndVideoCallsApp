import React from "react";
import moment from "moment";
import { Image } from "react-bootstrap";
import { MessageDropdown } from "./MessageDropdown";
import { MessagesEl } from "./MessagesElements";
import { useState } from "react";
import StyledAvatar from "../Avatar";

export default function GroupedMessages({ id, type, messages, name, userId }) {
  const [msgId, setMsgId] = useState("");
  const handleTimeToggle = (msgId) => {
    document.querySelectorAll(".opacity_animation").forEach((el) => {
      el.classList.remove("opacity_animation");
      el.classList.add("opacity_none");
      //   el.parentElement.classList.remove("box_shadow");
    });
    if (document.getElementById(msgId).classList.contains("opacity_none")) {
      document.getElementById(msgId).classList.remove("opacity_none");
      document.getElementById(msgId).classList.add("opacity_animation");
      //   document.getElementById(msgId).parentElement.classList.add("box_shadow");
    } else {
      document.getElementById(msgId).classList.add("opacity_none");
      document.getElementById(msgId).classList.remove("opacity_animation");
    }
  };

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
        <MessagesEl.Row type={type}>
          <StyledAvatar
            src="https://source.unsplash.com/user/erondu"
            roundedCircle
          />
          <MessagesEl.Text>{name}</MessagesEl.Text>
        </MessagesEl.Row>
      )}
    </>
  );
}

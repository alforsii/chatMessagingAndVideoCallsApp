import React, { useEffect, useState } from "react";
// import { gql, useSubscription } from "@apollo/client";
import { Image, ListGroup, Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RoomUsersDropdown from "./RoomUsersDropdown";

// const ROOM_USERS_QUERY = gql`
//   subscription($roomId: ID!) {
//     roomUsers(roomId: $roomId) {
//       id
//       email
//       lastName
//       firstName
//     }
//   }
// `;

export default function RoomUsers({ roomId, roomUsers: users }) {
  const [open, setOpen] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  // const { data, error } = useSubscription(ROOM_USERS_QUERY, {
  //   variables: { roomId },
  // });

  // if (!data) return null;
  // if (error) return console.log(error);
  // const isInRoomUsers = rooms?.map((user) => user.id).includes(roomId);

  useEffect(() => {
    if (users) {
      setRoomUsers(users);
    }
  }, [roomId, users]);

  return (
    <>
      <ListGroup variant="flush">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle
            variant="primary"
            onClick={() => setOpen(!open)}
            as={ListGroup.Item}
            eventKey="0"
          >
            {/* <ListGroup.Item variant="primary"> */}
            {open ? (
              <i className="fas fa-arrow-down"></i>
            ) : (
              <i className="fas fa-arrow-up"></i>
            )}{" "}
            room users | online
            {/* </ListGroup.Item> */}
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <div
              style={
                {
                  // overflow: "scroll",
                  // backgroundColor: "#fff",
                  // height: "100%",
                }
              }
            >
              {roomUsers.length ? (
                roomUsers.map((roomUser, index) => (
                  <ListGroup.Item
                    style={{
                      marginBottom: 2,
                      padding: 5,
                      border: "none",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <div>
                      <Image
                        style={{ width: "40px", height: "40px" }}
                        src="https://source.unsplash.com/user/erondu"
                        roundedCircle
                      />
                      <NavLink
                        style={{ marginLeft: 10 }}
                        to={`/user/${roomUser.id}`}
                      >
                        {`${roomUser.firstName} ${roomUser.lastName}`}
                      </NavLink>
                    </div>
                    <RoomUsersDropdown
                      roomId={roomId}
                      otherUserId={roomUser.id}
                    />
                  </ListGroup.Item>
                ))
              ) : (
                <div style={{ padding: 10, margin: 5 }}>
                  <p>{`No users in the Room!`}</p>
                </div>
              )}
            </div>
          </Accordion.Collapse>
        </Accordion>
      </ListGroup>
    </>
  );
}

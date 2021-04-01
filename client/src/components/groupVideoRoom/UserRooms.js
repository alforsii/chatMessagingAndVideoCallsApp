import React, { useEffect } from "react";
import { gql, useSubscription } from "@apollo/client";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import UserRoomsDropdown from "./UserRoomsDropdown";

const USER_ROOMS_QUERY = gql`
  subscription($userId: ID!) {
    userRooms(userId: $userId) {
      id
      roomName
    }
  }
`;

export default function UserRooms({ userId, updateState }) {
  const { data, error } = useSubscription(USER_ROOMS_QUERY, {
    variables: { userId },
  });

  useEffect(() => {
    updateState({ rooms: data?.userRooms });
    // eslint-disable-next-line
  }, [data?.userRooms]);

  if (!data) return null;
  if (error) return console.log(error);

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">
          <span>Your video rooms | Groups</span>
          <CreateRoom />
        </ListGroup.Item>
        {data.userRooms.map((room) => (
          <ListGroup.Item
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 5,
              marginLeft: 10,
              padding: 5,
              border: "none",
              borderBottom: "1px solid #eee",
            }}
            key={room.id}
          >
            <NavLink to={`/group/${room.id}`}>{room.roomName}</NavLink>
            <UserRoomsDropdown roomId={room.id} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

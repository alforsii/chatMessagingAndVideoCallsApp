import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserRooms from "./UserRooms";
import RoomUsers from "./RoomUsers";
import RoomUsersWithLiveVideos from "./RoomUsersWithLiveVideo";

export default function VideoRoom(props) {
  const roomId = props?.match?.params?.roomId;
  const { userId, user, updateState } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  return (
    <Container>
      <Row className="row row-cols-2 g-2">
        <Col md={4} lg={4}>
          <UserRooms updateState={updateState} userId={userId} />
          <RoomUsers roomId={roomId} roomUsers={roomUsers} />
        </Col>

        <Col md={8} lg={8}>
          {roomId && (
            <RoomUsersWithLiveVideos
              roomId={roomId}
              userId={userId}
              user={user}
              setRoomUsers={setRoomUsers}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

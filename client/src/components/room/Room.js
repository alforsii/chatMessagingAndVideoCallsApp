import { Container, Row, Col } from "react-bootstrap";
import UserRooms from "./UserRooms";
import RoomUsers from "./RoomUsers";
import RoomUsersWithLiveVideos from "./RoomUsersWithLiveVideo";

export default function Room(props) {
  const roomId = props?.match?.params?.id;

  return (
    <Container>
      <Row className="row row-cols-2 g-2">
        <Col md={4} lg={4}>
          <UserRooms updateState={props.updateState} userId={props.userId} />
          <RoomUsers
            rooms={props.rooms}
            roomId={roomId}
            currentUserId={props.userId}
          />
        </Col>

        <Col md={8} lg={8}>
          {roomId && (
            <RoomUsersWithLiveVideos roomId={roomId} userId={props.userId} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

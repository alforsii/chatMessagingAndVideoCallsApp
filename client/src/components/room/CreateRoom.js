import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Badge,
} from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const NEW_ROOM_QUERY = gql`
  mutation($userId: ID!, $roomName: String!) {
    createRoom(userId: $userId, roomName: $roomName) {
      id
      roomName
    }
  }
`;

export default function CreateRoom() {
  const [CreateRoom] = useMutation(NEW_ROOM_QUERY);
  const [smShow, setSmShow] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  return (
    <AuthContext.Consumer>
      {(ctx) => {
        const handleCreateRoom = async (e) => {
          e.preventDefault();
          try {
            if (!roomName) return setErrMessage("Type a name!");
            if (!ctx.state.user.id) return ctx.logout();

            const { data, errors } = await CreateRoom({
              variables: { roomName, userId: ctx.state.user.id },
            });
            if (errors?.length) {
              return setErrMessage(errors[0].message);
            }
            if (!data) {
              return setErrMessage("Something went wrong!");
            }

            ctx.updateState({
              alertMessage: `New ${data.createRoom.roomName} room created!`,
              alertSuccess: true,
              alertMessageId: data.createRoom.id,
              rooms: [...ctx.state.rooms, data?.createRoom],
            });

            setRoomName("");
            setSmShow(false);
          } catch (err) {
            console.log(err);
          }
        };

        return (
          <>
            <Badge
              style={{ cursor: "pointer", float: "right" }}
              onClick={() => {
                setSmShow(true);
              }}
              variant="primary"
            >
              +
            </Badge>
            <CreateModal
              onHide={() => {
                setErrMessage("");
                setSmShow(false);
              }}
              onChange={(e) => {
                setErrMessage("");
                setRoomName(e.target.value);
              }}
              roomName={roomName}
              smShow={smShow}
              errMessage={errMessage}
              handleCreateRoom={handleCreateRoom}
            />
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}

//

const CreateModal = ({
  onHide,
  smShow,
  roomName,
  errMessage,
  onChange,
  handleCreateRoom,
}) => {
  // const useFocus = () => {
  //   const htmlElRef = useRef(null);
  //   const setFocus = () => {
  //     htmlElRef.current && htmlElRef.current.focus();
  //   };

  //   return [htmlElRef, setFocus];
  // };

  // const [inputRef, setInputFocus] = useFocus();

  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={onHide}
      aria-labelledby="create-room-form"
    >
      <Modal.Header closeButton>
        <Modal.Title id="create-room-form">Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "#dc3545" }}>{errMessage && errMessage}</p>
        <Form inline onSubmit={handleCreateRoom}>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={onChange}
              value={roomName}
              placeholder="RoomName..."
              autoFocus
            />
          </InputGroup>

          <Button type="submit" className="mb-2">
            Create Room
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

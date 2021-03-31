import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { cameraSelections, startStream, stopStream } from "./myVideoStream";
import "./Room.css";
import io from "socket.io-client";
import Peer from "simple-peer";

const ROOM_USERS_QUERY = gql`
  subscription($roomId: ID!) {
    roomUsers(roomId: $roomId) {
      id
      email
      lastName
      firstName
      deviceId
    }
  }
`;
const JOIN_TO_ROOM_QUERY = gql`
  mutation($userId: ID!, $roomId: ID!, $deviceId: ID!) {
    joinToRoom(
      userId: $userId
      roomId: $roomId
      deviceId: $deviceId #   stream: $stream
    ) {
      id
      roomName
    }
  }
`;
const LEAVE_ROOM_QUERY = gql`
  mutation($roomId: ID!, $userId: ID!) {
    leaveTheRoom(roomId: $roomId, userId: $userId) {
      id
    }
  }
`;

export default function RoomUsersWithLiveVideos({ roomId, userId }) {
  //   const [LeaveTheRoom] = useMutation(LEAVE_ROOM_QUERY);
  const { data, error } = useSubscription(ROOM_USERS_QUERY, {
    variables: { roomId },
  });
  const [cameras, setCameras] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [JoinToRoom] = useMutation(JOIN_TO_ROOM_QUERY);
  const [myStream, setMyStream] = useState(null);
  const [mySocketId, setMySocketId] = useState(null);
  //   const [incomingCall, setIncomingCall] = useState(false);
  const [caller, setCaller] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [callerSignalData, setCallerSignalData] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [usersOnCall, setUsersOnCall] = useState([]);
  const [users, setUsers] = useState({});
  const [rooms, setRooms] = useState({});

  const videoRef = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  const [constraints, setConstrains] = useState({ video: true, audio: true });

  // Join to the room
  const joinToRoom = async (deviceId, stream) => {
    try {
      const { data, errors } = await JoinToRoom({
        variables: {
          userId,
          roomId,
          deviceId,
          // stream,
        },
      });
      if (data && data.joinToRoom) {
        console.log(data);
        return data.joinToRoom.id;
      } else {
        console.log(errors[0].message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   onMOUNT =-= -=-=-= =-=-=-=-= -=-=-=- -=-=-=-=
  useEffect(() => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices &&
      roomId
    ) {
      // stream
      startStream(constraints)
        .then(async (stream) => {
          setMyStream(stream);
          addVideoStream(videoRef.current, stream);
          socketConnections(roomId);
          // Get user cameras
          cameraSelections()
            .then((videoCameras) => {
              setCameras(videoCameras);
              //   setDeviceId(videoCameras[0]?.deviceId);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          stopStream();
          console.log(err);
        });
    }

    return () => {
      stopStream();
      socketDisconnections();
    };
    // eslint-disable-next-line
  }, [roomId]);

  //   socket CONNECTIONs =-= =-=-=- -=-=- =-=-=- -=-=-= =-=-=-=-
  const socketConnections = (roomId) => {
    socket.current = io.connect("ws://localhost:8000/", {
      withCredentials: true,
      //   extraHeaders: {
      //     "my-custom-header": "abcd",
      //   },
    });
    // USER JOINED =-=-=-=
    socket.current.on("yourId", (id) => {
      setMySocketId(id);
      socket.current.emit("userJoinedRoom", {
        userId,
        roomId,
        socketId: id,
      });
    });
    // ROOMS =-=-=-=-=-
    socket.current.on("rooms", ({ rooms }) => {
      console.log("🚀 ~socket.current.on ~ rooms", rooms);
      setUsers(rooms[roomId]);
      setRooms(rooms);
    });
    // INCOMING CALL =-=-=-=-=
    socket.current.on("incomingCall", ({ signalData, callFrom }) => {
      setCaller(callFrom);
      setCallerSignalData(signalData);
    });
    // // user disconnected - now remove from UI
    socket.current.on("userDisconnected", (socketId) => {
      const updateUsersOnCall = usersOnCall.filter(
        (id) => id !== socketId || id !== caller
      );
      setUsersOnCall(updateUsersOnCall);
      setCallAccepted(false);
      setReceiver(null);
      setCaller(null);
    });
  };
  //   socket DISCONNECTED =-= -=-= -=-= =-=-=
  const socketDisconnections = () => {
    // socket.current.emit("userLeftRoom", {
    //   roomId,
    //   socketId: mySocketId,
    // });
    if (socket.current) {
      socket.current.disconnect();
    }
  };
  //   addUserVideo =- =-=-= -=-=- =-== -=-=-=-
  const addVideoStream = (video, stream) => {
    if ("srcObject" in video) {
      video.srcObject = stream;
    } else {
      video.src = window.URL.createObjectURL(stream); // for older browsers
    }
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  };

  //   CALL user =- =-=- =-=-=-= -=-=-= -=-==-= -=-=-= -=-=-=-
  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    peer.on("signal", (signalData) => {
      setReceiver(id);
      socket.current.emit("callUser", {
        callTo: id,
        signalData,
        callFrom: mySocketId,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        addVideoStream(partnerVideo.current, stream);
      }
    });

    socket.current.on("callAccepted", ({ signalData }) => {
      setCallAccepted(true);
      setUsersOnCall([...usersOnCall, id]);
      peer.signal(signalData);
    });
    socket.current.on("callRejected", ({ callFrom }) => {
      //   setCallAccepted(false);
      setReceiver(null);
    });
  };

  //   ACCEPT call =-=-=-= =-=-= -=-=-= -=-==-=- =-=-=-= =-=-=-=-
  const acceptCall = (caller) => {
    setUsersOnCall([...usersOnCall, caller]);
    setCallAccepted(true);
    setCaller(null);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });

    peer.on("signal", (signalData) => {
      socket.current.emit("acceptCall", {
        signalData,
        callTo: caller,
      });
    });

    peer.on("stream", (stream) => {
      addVideoStream(partnerVideo.current, stream);
    });

    peer.signal(callerSignalData);
  };

  //   REJECT call =-=-=-= -=-=-=- =-=-=-=-= =-=-=-= -=-=-=-= -=-=- =
  const rejectCall = (caller) => {
    setCaller(null);
    socket.current.emit("rejectCall", { callTo: caller, callFrom: mySocketId });
  };

  if (!data) return null;
  if (error) return console.log(error);

  return (
    <div>
      <div>
        <div className="video-options">
          <select
            onSelect={(val) => setDeviceId(val)}
            className="custom-select"
          >
            {cameras?.map((videoDevice) => {
              return (
                <option key={videoDevice.deviceId} value={videoDevice.deviceId}>
                  {videoDevice.label}
                </option>
              );
            })}
          </select>
          <div id="video-grid">
            <video muted ref={videoRef}></video>
            {callAccepted && <video ref={partnerVideo}></video>}
          </div>
          <div>
            {rooms[roomId]
              ? Object.keys(rooms[roomId]).map((id) => {
                  console.log(id);
                  const users = rooms[roomId];
                  if (
                    id === mySocketId ||
                    id === caller ||
                    usersOnCall.includes(id)
                  ) {
                    return null;
                  }

                  return (
                    <button
                      disabled={receiver ? true : false}
                      key={id}
                      onClick={() => callPeer(id)}
                    >
                      {receiver ? `Calling ${users[id]}` : `Call ${users[id]}`}
                    </button>
                  );
                })
              : null}
          </div>
          <div>
            {caller && (
              <>
                <h2>{caller} is calling you</h2>
                <button onClick={() => acceptCall(caller)}>accept</button>
                <button onClick={() => rejectCall(caller)}>reject</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

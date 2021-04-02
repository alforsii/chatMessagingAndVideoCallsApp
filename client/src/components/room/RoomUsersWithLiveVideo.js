import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  cameraSelections,
  startStream,
  stopStream,
} from "./videoControlsUtils";
import "./Room.css";

export default function RoomUsersWithLiveVideos({
  roomId,
  user,
  userId,
  setRoomUsers,
}) {
  const [cameras, setCameras] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [mySocketId, setMySocketId] = useState(null);
  const [caller, setCaller] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [callerSignalData, setCallerSignalData] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [usersOnCall, setUsersOnCall] = useState([]);
  const [rooms, setRooms] = useState({});

  const videoRef = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  const [constraints, setConstrains] = useState({ video: true, audio: true });
  //   onMOUNT =-= -=-=-= =-=-=-=-= -=-=-=- -=-=-=-=
  useEffect(() => {
    if (roomId && user) {
      // Get user cameras
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        cameraSelections()
          .then((videoCameras) => {
            let deviceId = videoCameras[0]?.deviceId;
            setCameras(videoCameras);
            setDeviceId(deviceId);

            // stream
            startStream(constraints, userId)
              .then(async (stream) => {
                setMyStream(stream);
                addVideoStream(videoRef.current, stream);
                socketConnection(roomId, user);
              })
              .catch((err) => {
                stopStream(userId);
                console.log(err);
              });
          })
          .catch((err) => console.log(err));
      }
    }

    return () => {
      stopStream(userId);
      socketDisconnection();
    };
    // eslint-disable-next-line
  }, [roomId, user]);

  //   socket CONNECTIONs =-= =-=-=- -=-=- =-=-=- -=-=-= =-=-=-=-
  const socketConnection = (roomId, userDetails) => {
    socket.current = io.connect("ws://localhost:8000/", {
      withCredentials: true,
      // extraHeaders: {
      //   myPath: "/room",
      // },
      path: "/room",
    });
    // USER JOINED =-=-=-=
    socket.current.on("yourId", (id) => {
      setMySocketId(id);
      socket.current.emit("userJoinedRoom", {
        userDetails,
        roomId,
        socketId: id,
      });
    });
    // ROOMS =-=-=-=-=-
    socket.current.on("rooms", ({ rooms }) => {
      setRooms(rooms);
      setRoomUsers(Object.values(rooms[roomId]));
      //   updateState(rooms);
    });
    // INCOMING CALL =-=-=-=-=
    socket.current.on("incomingCall", ({ signalData, callFrom }) => {
      setCaller(callFrom);
      setIncomingCall(true);
      setCallerSignalData(signalData);
    });
    // // user disconnected - now remove from UI
    socket.current.on("userDisconnected", (socketId) => {
      // 2.Remove from user UI who is still in the room
      resetUserCallHistory();
    });
  };
  //   socket DISCONNECTED =-= -=-= -=-= =-=-=
  const socketDisconnection = () => {
    if (socket.current) {
      // 1.Remove other user from disconnected UI
      socket.current.disconnect();
      resetUserCallHistory();
    }
  };

  //   Reset user video calls | when switching between rooms or left
  const resetUserCallHistory = () => {
    setCallAccepted(false);
    setUsersOnCall([]);
    setReceiver(null);
    setCaller(null);
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

  //   CALL a user =- =-=- =-=-=-= -=-=-= -=-==-= -=-=-= -=-=-=-
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

    socket.current.on("callAccepted", ({ signalData, callFrom }) => {
      setCallAccepted(true);
      setReceiver(callFrom);
      setUsersOnCall([...usersOnCall, id]);

      peer.signal(signalData);
    });
    socket.current.on("callRejected", ({ callFrom }) => {
      // setCallAccepted(false);
      setReceiver(null);
    });
  };

  //   ACCEPT call =-=-=-= =-=-= -=-=-= -=-==-=- =-=-=-= =-=-=-=-
  const acceptCall = (caller) => {
    setUsersOnCall([...usersOnCall, caller]);
    setCallAccepted(true);
    setIncomingCall(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });

    peer.on("signal", (signalData) => {
      socket.current.emit("acceptCall", {
        signalData,
        callTo: caller,
        callFrom: mySocketId,
      });
    });

    peer.on("stream", (stream) => {
      addVideoStream(partnerVideo.current, stream);
    });

    peer.signal(callerSignalData);
  };

  //   REJECT call =-=-=-= -=-=-=- =-=-=-=-= =-=-=-= -=-=-=-= -=-=- =
  const rejectCall = (caller) => {
    setIncomingCall(false);
    socket.current.emit("rejectCall", { callTo: caller, callFrom: mySocketId });
  };
  // console.log("caller: ", rooms[roomId]?.[caller]?.firstName);
  // console.log("receiver: ", rooms[roomId]?.[receiver]?.firstName);
  const mirrorMe = () => {
    document.getElementById("myVideo").classList.toggle("mirrored_video");
  };
  return (
    <div>
      <div className="video-options">
        <select onSelect={(val) => setDeviceId(val)} className="custom-select">
          {cameras?.map((videoDevice) => {
            return (
              <option key={videoDevice.deviceId} value={videoDevice.deviceId}>
                {videoDevice.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="actions-btns">
        {incomingCall && (
          <>
            <h2>{rooms[roomId][caller].firstName} is calling you...</h2>
            <Button variant="success mr-2" onClick={() => acceptCall(caller)}>
              accept
            </Button>
            <Button variant="danger" onClick={() => rejectCall(caller)}>
              reject
            </Button>
          </>
        )}
      </div>
      <div id="video-grid">
        <div className="videos-div">
          <video
            className="mirrored_video"
            id="myVideo"
            muted
            ref={videoRef}
          ></video>
          <p className="userNames">You: {user.firstName}</p>
          <button onClick={mirrorMe}>ToggleMirror</button>
        </div>

        {callAccepted && (
          <div className="videos-div">
            <video ref={partnerVideo}></video>
            <p className="userNames">
              {mySocketId !== caller
                ? rooms[roomId][caller]?.firstName
                : rooms[roomId][receiver]?.firstName}
            </p>
          </div>
        )}
      </div>
      <div>
        {rooms[roomId]
          ? Object.keys(rooms[roomId]).map((id) => {
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
                  disabled={receiver === id ? true : false}
                  key={id}
                  onClick={() => callPeer(id)}
                >
                  {receiver
                    ? `Calling ${users[id].firstName}`
                    : `Call ${users[id].firstName}`}
                </button>
              );
            })
          : null}
      </div>
    </div>
  );
}

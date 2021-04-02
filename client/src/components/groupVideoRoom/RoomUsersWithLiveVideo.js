import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { startStream, stopStream } from "./videoControlsUtils";

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

const Video = (props) => {
  const peerVideoRef = useRef();
  // rooms[roomId][peer].firstName;

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      addVideoStream(peerVideoRef.current, stream);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="videos-div">
      <video ref={peerVideoRef}></video>
      <p className="userNames">{props.name}</p>
    </div>
  );
};

export default function RoomUsersWithLiveVideos({
  roomId,
  user: userDetails,
  userId,
  setRoomUsers,
}) {
  // const [mySocketId, setMySocketId] = useState(null);
  const [rooms, setRooms] = useState({});
  const [peers, setPeers] = useState([]);

  const videoRef = useRef();
  const peersRef = useRef([]);
  const socketRef = useRef();

  const [constraints] = useState({ video: true, audio: true });
  //   onMOUNT =-= -=-=-= =-=-=-=-= -=-=-=- -=-=-=-=
  useEffect(() => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices &&
      roomId
    ) {
      startStream(constraints, userId)
        .then(gotMediaStream)
        .catch((err) => {
          stopStream(userId);
          console.log(err);
        });
    }

    return () => {
      stopStream(userId);
      socketDisconnection();
    };
    // eslint-disable-next-line
  }, [roomId]);

  // 1.Got Media Stream ? =-=-=-=-=- -=-= -=- =-=-= -=- =-=- =-= -=-= -=-=-= -
  const gotMediaStream = async (stream) => {
    addVideoStream(videoRef.current, stream);
    // Socket connections
    socketRef.current = io.connect("ws://localhost:8000/", {
      withCredentials: true,
      // extraHeaders: {
      //   myPath: "/group",
      // },
      path: "/group",
    });
    // request JOIN to Group =-=-=-== -=- =-= -=- =-= -=-=- =-=- -=-
    socketRef.current.on("group-channel:mySocketId", (id) => {
      // setMySocketId(id);
      socketRef.current.emit("group-channel:joinRoom", {
        userDetails,
        roomId,
        socketId: id,
      });
    });

    // =-=-=-=- Send signal to the room users from joined user
    socketRef.current.on("group-channel:usersIds", ({ usersIds }) => {
      console.log("🚀 ~ usersIds", usersIds);
      const peers = [];
      usersIds?.forEach((userId, index) => {
        console.log("🚀 userId", index, userId);
        const peer = createPeer(userId, socketRef.current.id, stream);
        peersRef.current.push({
          peerId: userId,
          peer,
        });
        peers.push(peer);
      });
      setPeers(peers);
    });

    // set rooms online users =- =-=- =-= -= -=-= -= -=- =- =-=- =-=-=
    socketRef.current.on("group-channel:rooms", ({ rooms }) => {
      const room = rooms[roomId];
      const usersDetails = Object.values(room);
      setRoomUsers(usersDetails);
      setRooms(rooms);
    });

    // =-=-=-=-=-=-=- Rest of the users whichever available adds this joined user as peer
    socketRef.current.on(
      "group-channel:joinedRoom",
      ({ signalData: incomingSignal, callFrom }) => {
        const peer = addPeer(incomingSignal, callFrom, stream);
        peersRef.current.push({
          peerId: callFrom,
          peer,
        });
      }
    );
    // =-= -=-= -= -=- =-= -=-=- =-=- -= =-= -=-= -=-=- =-=- =- =-=- =- =- =-= -=-
    // receive returned signal | from individual user in group. So we hav to find that particular user from who we got returnedSignal
    socketRef.current.on(
      "group-channel:returnedSignal",
      ({ userId: peerId, signalData }) => {
        const foundPeerRef = peersRef.current.filter(
          (p) => p.peerId === peerId
        )[0];
        console.log(foundPeerRef);
        foundPeerRef.peer.signal(signalData);
      }
    );
  };

  // =- =-- =-=- =-=--= =-= -= -=-=- =-=-=-=- =-=-= -=-= -=-=- =-=- =-=- =-=-= -= =-= -=- =-
  // create Peer with each user in group | Send signal from joined user to every user in group
  const createPeer = (callTo, callFrom, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    // send signal for each user in group | loop
    peer.on("signal", (signalData) => {
      socketRef.current.emit("group-channel:sendJoinedSignal", {
        callTo,
        callFrom,
        signalData,
      });
    });

    return peer;
  };
  // =-=-=-= =-=-=- =--=- == -= -== -= =- =-=-= -=-=- -=-= -=-=- =-= -=- =-=- =
  // Add peer | this is the user who receiving incoming call from joined user
  const addPeer = (incomeSignal, callFrom, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signalData) => {
      socketRef.current.emit("group-channel:respondToJoinedSignal", {
        caller: callFrom,
        signalData,
      });
    });

    peer.signal(incomeSignal);
    return peer;
  };

  //   socket DISCONNECTED =-= -=-= -=-= =-=-== -=- =-= -=- =-= -=-=-=- =-= -=-=-
  const socketDisconnection = () => {
    if (socketRef.current) {
      // 1.Remove other user from disconnected UI
      socketRef.current.disconnect();
    }
  };
  // -=- =-=- =-= -=- =- =-= -= -=-=- =-= -=- =-= - =- =- =- =-= -- =- =- =-=-- ==- =-
  return (
    <div id="video-grid">
      <div className="videos-div">
        <video className="mirrored_video" muted ref={videoRef}></video>
        <p className="userNames">You: {userDetails.firstName}</p>
      </div>

      {peers.map((peer, index) => (
        <Video
          key={index}
          peer={peer}
          name={rooms[roomId]?.[peer]?.firstName}
        />
      ))}
    </div>
  );
}

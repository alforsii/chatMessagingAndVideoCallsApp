const rooms = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    // if (!users[socket.id]) {
    //   users[socket.id] = socket.id;
    // }

    // =-=-=-=-==-=-= 1.User entered room | joined =-=-=-==-=-=-=-=-=-=
    // 1.0. Send joined user socketId to get roomId and userId
    socket.emit("yourId", socket.id);
    // 1.1. On user joined room
    socket.on("userJoinedRoom", ({ roomId, userDetails, socketId }) => {
      // if room doesn't exists | create room and add current first user to it
      if (!rooms[roomId]) {
        rooms[roomId] = {};
        rooms[roomId][socketId] = userDetails;
      } else {
        // else if room exists, but current user is not in the room | add user to the room
        if (!rooms[roomId][socketId]) {
          rooms[roomId][socketId] = userDetails;
        }
      }
      //  send updated rooms to all
      io.sockets.emit("rooms", { rooms });
      console.log(
        "🚀 ~ =-=-=-=-=-=-=-=-=-=-=userJoinedRoom =-=-=-=-=-==-==-=-=-",
        {
          rooms,
        }
      );
    });
    // =-=-=-=-=-- 2.Call in progress =-=-= =-=-=-=-=-=-=-=-=-=-=-
    // 2.1. If calling | Send incomingCall to the calling user
    socket.on("callUser", ({ callTo, callFrom, signalData }) => {
      console.log("🚀 ~  callTo", callTo);
      io.to(callTo).emit("incomingCall", { signalData, callFrom });
    });
    // 2.2. If accepted | Send callAccepted to the caller
    socket.on("acceptCall", ({ callTo, signalData }) => {
      io.to(callTo).emit("callAccepted", { signalData });
    });
    // 2.3 If rejected | Send rejectCall to the caller
    socket.on("rejectCall", ({ callTo, callFrom }) => {
      io.to(callTo).emit("callRejected", { callFrom });
    });

    // -=-=-=-=-=- 3.Disconnection | user left room =-=-=-=-=-=-===-=-=-=
    socket.on("disconnect", () => {
      console.log("user " + socket.id + " disconnected!");
      for (let room in rooms) {
        const sockets = Object.keys(rooms[room]);
        if (sockets.includes(socket.id)) {
          console.log(
            "🚀Delete user:",
            rooms[room][socket.id],
            " From room: ",
            rooms[room]
          );
          delete rooms[room][socket.id];
          console.log("🚀=-=-==-=-rooms[room] after: ", rooms[room]);
          console.log("🚀=-=-=--=-rooms after: ", rooms);
          io.sockets.emit("userDisconnected", socket.id);
          io.sockets.emit("rooms", { rooms });
        }
      }
    });
  });
};

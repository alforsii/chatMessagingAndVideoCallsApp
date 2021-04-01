const rooms = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    // =-=-=-=-==-=-= 1.User entered room | joined =-=-=-==-=-=-=-=-=-=
    // 1.0. Send joined user socketId to get roomId and userId
    socket.emit("group-channel:mySocketId", socket.id);
    // socket.on('group-channel:join room', (userObj, room) => {
    //     socket.join(room).emit('join room', userObj); //\\<-- this will only let the socket from front end which emit 'join room' receive event

    //     socket.broadcast.to(room).emit(`join room', userObj`); //\\<-- this will let all socket from front end(in the same room) receive 'join room' event except the one which emit.
    // });

    // socket.on('group-channel:join chat', (msgObj, room) => {
    //     socket.in(room).emit('join chat', msgObj);
    // });

    // socket.on('group-channel:chat message', (msgObj, room) => {
    //     socket.in(room).emit('chat message', msgObj);
    // });

    // =-=-=-=-=-=-=-= Group joined user =-=-=-=-==-=-=-=--=-=-

    socket.on("group-channel:joinRoom", ({ userDetails, roomId, socketId }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = {};
        rooms[roomId][socketId] = userDetails;
      } else {
        // else if room exists, but current user is not in the room | add user to the room
        if (!rooms[roomId][socketId]) {
          rooms[roomId][socketId] = userDetails;
        }
      }
      //  send updated to the group users
      const usersIds = Object.keys(rooms[roomId]);
      // const restOfUsersDetails = Object.values(rooms[roomId]);
      const restUsersIds = usersIds.filter((id) => id !== socketId);
      console.log("🚀 ~restUsersIds", restUsersIds);

      io.sockets.emit("group-channel:usersIds", { usersIds: restUsersIds });
      io.sockets.emit("group-channel:rooms", { rooms });
      console.log("join rooms -=-=-=-=-=-=-=-=--=--=-=-=-=", socket.id);
    });

    socket.on(
      "group-channel:sendJoinedSignal",
      ({ callTo, callFrom, signalData }) => {
        // since this signal coming from loop for each user:
        io.to(callTo).emit("group-channel:joinedRoom", {
          callFrom,
          signalData,
        });
      }
    );
    socket.on(
      "group-channel:respondToJoinedSignal",
      ({ caller, signalData }) => {
        // return caller signal
        io.to(caller).emit("group-channel:returnedSignal", {
          userId: socket.id,
          signalData,
        });
      }
    );

    // -=-=-=-=-=- 3.Disconnection | user left room =-=-=-=-=-=-===-=-=-=
    socket.on("disconnect", () => {
      console.log("🚀userLeftGroup=-=-==-=-=-=-=-=-=-=-=-=-", socket.id);
      for (let room in rooms) {
        const sockets = Object.keys(rooms[room]);
        if (sockets.includes(socket.id)) {
          delete rooms[room][socket.id];
          io.sockets.emit("group-channel:userLeftGroup", socket.id);
          io.sockets.emit("group-channel:rooms", { rooms });
          //   console.log("rooms", rooms);
        }
      }
    });
  });
};

const { Room } = require("../../models/Room.model");
const { User } = require("../../models/User.model");

exports.RoomResolvers = {
  Query: {},
  Mutation: {
    createRoom: async (_, { userId, roomName }, { pubSub }) => {
      try {
        const newRoom = await Room.create({
          roomName,
          roomAuthor: userId,
        });

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: { rooms: newRoom._id },
          },
          { new: true, runValidators: true }
        ).populate([
          {
            path: "rooms",
            // populate: [
            //   { path: "roomAuthor" },
            //   { path: "roomUsers" },
            // ],
          },
        ]);

        // Update user Rooms
        pubSub.publish(`USER_ROOMS-${updatedUser._id}`, {
          userRooms: updatedUser.rooms,
        });
        // pubSub.publish("channel", {
        //   [SubscriptionName]: data,
        // });

        return newRoom;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    // searchRoom: async (_, { roomName }) => {
    //   try {
    //     return await User.findById({ roomName });
    //   } catch (err) {
    //     console.log(err);
    //     return err;
    //   }
    // },

    // addOtherUserRoom: async (_, { userId, roomId }, { pubSub }) => {
    //   try {
    //     const theUser = await User.findById(userId).populate("rooms");
    //     const isRoomExist = theUser.rooms.filter(
    //       (room) => room._id.toString() === roomId.toString()
    //     )[0];
    //     if (!isRoomExist) {
    //       const updatedUser = await User.findByIdAndUpdate(
    //         userId,
    //         {
    //           $push: { rooms: updatedRoom._id },
    //         },
    //         { new: true, runValidators: true }
    //       ).populate([
    //         {
    //           path: "rooms",
    //           // populate: [
    //           //   { path: "roomAuthor" },
    //           //   { path: "roomUsers" },
    //           // ],
    //         },
    //       ]);
    //       // 1. Update current added room to joined user rooms list
    //       pubSub.publish(`USER_ROOMS-${updatedUser._id}`, {
    //         userRooms: updatedUser.rooms,
    //       });
    //     }
    //     return
    //   } catch (err) {
    //     console.log(err);
    //     return err;
    //   }
    // },

    // =-=-=Join to the Room =-=-=-=-=
    joinToRoom: async (_, { userId, roomId, deviceId }, { pubSub }) => {
      try {
        const theRoom = await Room.findById(roomId).populate("roomAuthor");
        if (!theRoom) {
          throw new Error("Sorry, this room no longer exist!");
        }
        const isUserExist = theRoom.roomUsers.includes(userId);

        if (isUserExist) {
          //   const room = await Room.findById(roomId).populate("roomUsers");
          //   pubSub.publish(`ROOM_USERS-${room._id}`, {
          //     roomUsers: room.roomUsers,
          //   });
          return;
        }

        // if (theRoom.roomAuthor._id.toString() !== authorId.toString()) {
        //   throw new Error(
        //     "You can't add a user to this room. You are not authorized!"
        //   );
        // }

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { deviceId },
          { new: true, runValidators: true }
        );

        const updatedRoom = await Room.findByIdAndUpdate(
          roomId,
          { $push: { roomUsers: updatedUser._id } },
          { new: true }
        ).populate([
          {
            path: "roomUsers",
          },
        ]);

        // 2. Update current room users list for all users since it's the only room for all
        pubSub.publish(`ROOM_USERS-${updatedRoom._id}`, {
          roomUsers: updatedRoom.roomUsers,
        });

        return updatedRoom;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    // =-=-=Leave the Room =-=-=-=-=
    leaveTheRoom: async (_, { userId, roomId }, { pubSub }) => {
      try {
        const updatedRoom = await Room.findByIdAndUpdate(
          roomId,
          { $pull: { roomUsers: userId } },
          { new: true }
        ).populate([
          {
            path: "roomUsers",
          },
        ]);

        // 2. Update current room users list for all users since it's the only room for all
        pubSub.publish(`ROOM_USERS-${updatedRoom._id}`, {
          roomUsers: updatedRoom.roomUsers,
        });

        return updatedRoom;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    // =-=-=Leave the Room =-=-=-=-=
    deleteTheRoom: async (_, { userId, roomId }, { pubSub }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          userId,
          { $pull: { rooms: roomId } },
          { new: true, runValidators: true }
        ).populate("rooms");
        // 2. Update current room users list for all users since it's the only room for all
        pubSub.publish(`USER_ROOMS-${updatedUser._id}`, {
          userRooms: updatedUser.rooms,
        });

        return roomId;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  Subscription: {
    roomUsers: {
      subscribe: async (_, { roomId }, { pubSub }) => {
        try {
          const room = await Room.findById(roomId).populate([
            { path: "roomUsers" },
          ]);
          if (!room) {
            return;
          }
          setTimeout(() => {
            // pubSub.publish(`channel`, { [SubscriptionName]: data });
            pubSub.publish(`ROOM_USERS-${room._id}`, {
              roomUsers: room.roomUsers,
            });
          }, 0);
          //     pubSub.asyncIterator([`channel`]);
          return pubSub.asyncIterator([`ROOM_USERS-${room._id}`]);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    userRooms: {
      subscribe: async (_, { userId }, { pubSub }) => {
        try {
          const rooms = await Room.find();
          //   const user = await User.findById(userId).populate([
          //     {
          //       path: "rooms",
          //       //   populate: [
          //       //     { path: "roomAuthor" },
          //       //     { path: "roomUsers" },
          //       //   ],
          //     },
          //   ]);
          if (!rooms.length) {
            return;
          }
          setTimeout(() => {
            // pubSub.publish(`channel`, { [SubscriptionName]: data });
            pubSub.publish(`USER_ROOMS-${userId}`, { userRooms: rooms });
            // pubSub.publish(`USER_ROOMS-${user._id}`, { userRooms: user.rooms });
          }, 0);
          //     pubSub.asyncIterator([`channel`]);
          return pubSub.asyncIterator([`USER_ROOMS-${userId}`]);
          //   return pubSub.asyncIterator([`USER_ROOMS-${user._id}`]);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
  },
};

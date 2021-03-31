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
          //   if (!user) {
          //     return;
          //   }
          if (!userId) {
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

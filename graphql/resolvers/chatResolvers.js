const { Chat } = require("../../models/Chat.model");
const { User } = require("../../models/User.model");

let typingUsers = {};
let onlineUsers = {};

exports.ChatResolvers = {
  Query: {
    // => user chats array | id, chatName
    // =-=-==-=-=  Instead using Subscribe userChats!!! =-=-=-=-=-=-=-=-=-=-=
    // userChats: async (_, { userId }) => {
    //   //   try {
    //   //     const user = await User.findById(userId).populate([
    //   //       {
    //   //         path: "chats",
    //   //         // populate: [
    //   //         //   { path: "chatAuthor" },
    //   //         //   { path: "chatUsers" },
    //   //         //   {
    //   //         //     path: "chatMessages",
    //   //         //     populate: [{ path: "messageAuthor" }],
    //   //         //   },
    //   //         // ],
    //   //       },
    //   //     ]);
    //   //     return user.chats;
    //   //   } catch (err) {
    //   //     console.log(err);
    //   //     return err;
    //   //   }
    // },
    // => users array in single chat | id, email, firstName, lastName
    // =-=-==-=-=  Instead using Subscribe chatUsers!!! =-=-=-=-=-=-=-=-=-=-=
    // chatUsers: async (_, { chatId }) => {
    //   //   try {
    //   //     const chat = await Chat.findById(chatId).populate([
    //   //       { path: "chatUsers" },
    //   //     ]);
    //   //     return chat.chatUsers;
    //   //   } catch (err) {
    //   //     console.log(err);
    //   //     return err;
    //   //   }
    // },
    // =-=-=-=-=-=-=-=-=-=- End Queries =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
    // =-=-=-=-=-=-=-=-=-=- End Queries =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
  },
  Mutation: {
    searchedChats: async (_, { chatName, userId }) => {
      try {
        let user = await User.findById(userId).populate("chats");
        if (chatName) {
          const searchedChats = user.chats.filter((chat) =>
            chat.chatName.toLowerCase().includes(chatName.toLowerCase())
          );
          return searchedChats;
        } else {
          return user.chats;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    searchedChatUsers: async (_, { username, chatId }) => {
      try {
        let chat = await Chat.findById(chatId).populate("chatUsers");
        if (username) {
          const searchedChatUsers = chat.chatUsers.filter(
            (user) =>
              user.firstName.toLowerCase().includes(username.toLowerCase()) ||
              user.lastName.toLowerCase().includes(username.toLowerCase())
          );
          return searchedChatUsers;
        } else {
          return chat.chatUsers;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    // (parent, args, context, info)
    // => newly created chat | id, chatName
    createChat: async (_, { userId, chatName }, { pubSub }) => {
      try {
        const newChat = await Chat.create({
          chatName,
          chatAuthor: userId,
          chatUsers: [userId],
        });

        // const currentChat = await Chat.findById(newChat._id).populate([
        //   { path: "chatAuthor" },
        //   //   { path: "chatUsers" },
        // ]);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: { chats: newChat._id },
          },
          { new: true, runValidators: true }
        ).populate([
          {
            path: "chats",
            // populate: [
            //   { path: "chatAuthor" },
            //   { path: "chatUsers" },
            // ],
          },
        ]);

        // Update user Chats
        pubSub.publish(`USER_CHATS-${updatedUser._id}`, {
          userChats: updatedUser.chats,
        });
        // pubSub.publish("channel", {
        //   [SubscriptionName]: data,
        // });

        return newChat;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    // actually leave the chat | when nno user left it will be auto removed!
    deleteChat: async (_, { chatId, userId }, { pubSub }) => {
      try {
        const foundChat = await Chat.findById(chatId).populate("chatAuthor");

        if (!foundChat) {
          throw new Error("Chat not found!");
        }

        // if (foundChat.chatAuthor._id.toString() !== userId.toString()) {
        //   throw new Error("You're not authorized!");
        // }

        // const removedChat = await Chat.findByIdAndRemove(chatId, { new: true });

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { chats: foundChat._id } },
          { new: true, runValidators: true }
        ).populate("chats");
        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          { $pull: { chatUsers: userId } },
          { new: true, runValidators: true }
        ).populate("chatUsers");

        const totalChatUsers = updatedChat.chatUsers.length;
        // If no user left - remove chat
        if (totalChatUsers === 0) {
          await Chat.findByIdAndRemove(chatId, {
            new: true,
          });
        }

        // 1.Update chats
        pubSub.publish(`USER_CHATS-${updatedUser._id}`, {
          userChats: updatedUser.chats,
        });
        // 2. Update chat users
        pubSub.publish(`CHAT_USERS-${updatedChat._id}`, {
          // chatUsers: updatedChat.chatUsers, // previous return
          chatUsers: {
            chatName: updatedChat.chatName,
            users: updatedChat.chatUsers,
          },
        });

        return {
          id: foundChat._id,
          message:
            totalChatUsers > 0
              ? `You left Chat: ${foundChat.chatName}!`
              : `You left and Chat: ${foundChat.chatName} removed!`,
        };
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    updateChat: async (_, { chatId, authorId, chatName }, { pubSub }) => {
      try {
        const chatAuthor = await Chat.findOne({
          _id: chatId,
          chatAuthor: authorId,
        });

        if (!chatAuthor) {
          throw new Error("You are not the Author!");
        }
        const updatedChat = await Chat.findOneAndUpdate(
          { _id: chatId, chatAuthor: authorId },
          { chatName },
          { new: true }
        );

        const chatUsers = updatedChat.chatUsers;
        //since updatedChat.chatUsers not populated | will return only ids of each user
        chatUsers.forEach(async (userId) => {
          const user = await User.findById(userId).populate("chats");
          //1. Send Updated chatName for each user in the chat
          pubSub.publish(`USER_CHATS-${userId}`, {
            userChats: user.chats,
          });
        });

        return updatedChat;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    addChatUser: async (_, { chatId, authorId, otherUserId }, { pubSub }) => {
      try {
        const theChat = await Chat.findById(chatId).populate("chatAuthor");
        if (!theChat) return console.log("no chat found");
        const isUserExist = theChat.chatUsers.includes(otherUserId);

        if (isUserExist) {
          throw new Error(
            `User already exists in this chat ${theChat.chatName}!`
          );
        }

        if (theChat.chatAuthor._id.toString() !== authorId.toString()) {
          throw new Error(
            "You can't add a user to this chat. You are not authorized!"
          );
        }

        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          { $push: { chatUsers: otherUserId } },
          { new: true }
        ).populate([
          {
            path: "chatUsers",
          },
        ]);

        const updatedOtherUser = await User.findByIdAndUpdate(
          otherUserId,
          {
            $push: { chats: updatedChat._id },
          },
          { new: true, runValidators: true }
        ).populate([
          {
            path: "chats",
            // populate: [
            //   { path: "chatAuthor" },
            //   { path: "chatUsers" },
            // ],
          },
        ]);
        // 1. Update current added chat to otherUser chat list
        pubSub.publish(`USER_CHATS-${updatedOtherUser._id}`, {
          userChats: updatedOtherUser.chats,
        });
        // 2. Update current chat users list for all users since it's the only chat for all
        pubSub.publish(`CHAT_USERS-${updatedChat._id}`, {
          // chatUsers: updatedChat.chatUsers, // previous return
          chatUsers: {
            chatName: updatedChat.chatName,
            users: updatedChat.chatUsers,
          },
        });

        return updatedChat;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    deleteChatUser: async (
      _,
      { chatId, authorId, otherUserId },
      { pubSub }
    ) => {
      try {
        const foundChat = await Chat.findById(chatId).populate([
          { path: "chatUsers" },
          { path: "chatAuthor" },
        ]);
        if (!foundChat) {
          throw new Error("Can't find the chat!");
        }
        if (foundChat.chatAuthor._id.toString() !== authorId.toString()) {
          throw new Error(
            "Sorry, you can't remove users from this chat. You are not authorized!"
          );
        }
        // 1.Remove other user from chat by Admin | Author
        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          { $pull: { chatUsers: otherUserId } },
          { new: true, runValidators: true }
        ).populate("chatUsers");
        //2.Update other users chats | since he is removed from current chat
        const updatedOtherUser = await User.findByIdAndUpdate(
          otherUserId,
          { $pull: { chats: chatId } },
          { new: true, runValidators: true }
        ).populate("chats");
        // 3.If he is in the users typing list | remove!
        if (typingUsers[chatId]) {
          const isInTyping = typingUsers[chatId]
            .map((user) => user.id)
            .includes(otherUserId);
          if (isInTyping) {
            typingUsers[chatId] = typingUsers[chatId].filter(
              (user) => user.id !== otherUserId
            );
          }
        }
        // send update
        // 1. Update other user chats to otherUser chat list
        pubSub.publish(`USER_CHATS-${updatedOtherUser._id}`, {
          userChats: updatedOtherUser.chats,
        });
        // 2. Update current chat users list for all users since it's the only chat for all
        pubSub.publish(`CHAT_USERS-${updatedChat._id}`, {
          // chatUsers: updatedChat.chatUsers, // previous return
          chatUsers: {
            chatName: updatedChat.chatName,
            users: updatedChat.chatUsers,
          },
        });

        return {
          id: updatedChat.id,
          message: `The user removed from chat: ${updatedChat.chatName}!`,
        };
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    userStartTyping: (_, { username, userId, chatId }, { pubSub }) => {
      // if (!chatId || userId) {
      //   return;
      // }
      if (!typingUsers[chatId]) {
        typingUsers[chatId] = [{ username, id: userId }];
      } else {
        const isUserAlreadyTyping = typingUsers[chatId]
          .map((user) => user.id)
          .includes(userId);
        if (!isUserAlreadyTyping) {
          typingUsers[chatId].push({ username, id: userId });
          // pubSub.publish(`channel`, { [SubscriptionName]: data });
          pubSub.publish(`TYPING_CHAT_USERS-${chatId}`, {
            typingChatUsers: {
              id: chatId,
              users: typingUsers[chatId],
            },
          });
        } else {
          pubSub.publish(`TYPING_CHAT_USERS-${chatId}`, {
            typingChatUsers: {
              id: chatId,
              users: typingUsers[chatId],
            },
          });
        }
      }
      return userId;
    },

    userStopTyping: (_, { userId, chatId }, { pubSub }) => {
      // if (!chatId || userId) {
      //   return;
      // }
      typingUsers[chatId] = typingUsers[chatId]?.filter(
        (user) => user.id !== userId
      );
      // pubSub.publish(`channel`, { [SubscriptionName]: data });
      pubSub.publish(`TYPING_CHAT_USERS-${chatId}`, {
        typingChatUsers: {
          id: chatId,
          users: typingUsers[chatId],
        },
      });
      return userId;
    },
    userOnline: (
      _,
      { userId, chatId, firstName, lastName, image },
      { pubSub }
    ) => {
      console.log({ userId, chatId });
      if (!onlineUsers[chatId]) {
        onlineUsers[chatId] = [{ id: userId, firstName, lastName, image }];
      } else {
        const isUserAlreadyOnline = onlineUsers[chatId]
          .map((user) => user.id)
          .includes(userId);
        if (!isUserAlreadyOnline) {
          onlineUsers[chatId].push({ id: userId, firstName, lastName, image });
          // pubSub.publish(`channel`, { [SubscriptionName]: data });
          pubSub.publish(`ONLINE_CHAT_USERS-${chatId}`, {
            onlineUsers: {
              id: chatId,
              users: onlineUsers[chatId],
            },
          });
        } else {
          pubSub.publish(`ONLINE_CHAT_USERS-${chatId}`, {
            onlineUsers: {
              id: chatId,
              users: onlineUsers[chatId],
            },
          });
        }
      }
      return userId;
    },
    userOffline: (_, { userId, chatId }, { pubSub }) => {
      onlineUsers[chatId] = onlineUsers[chatId]?.filter(
        (user) => user.id !== userId
      );
      // pubSub.publish(`channel`, { [SubscriptionName]: data });
      pubSub.publish(`ONLINE_CHAT_USERS-${chatId}`, {
        onlineUsers: {
          id: chatId,
          users: onlineUsers[chatId],
        },
      });
      return userId;
    },
    // =-=-=-=-=-=-=-=-=-=- End Mutations =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
    // =-=-=-=-=-=-=-=-=-=- End Mutations =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
  },
  Subscription: {
    onlineUsers: {
      subscribe: (_, { chatId }, { pubSub }) => {
        try {
          if (!chatId) {
            return;
          }

          setTimeout(() => {
            //   // pubSub.publish(`channel`, { [SubscriptionName]: data });

            pubSub.publish(`ONLINE_CHAT_USERS-${chatId}`, {
              onlineUsers: {
                id: chatId,
                users: onlineUsers[chatId],
              },
            });
          }, 0);
          return pubSub.asyncIterator([`ONLINE_CHAT_USERS-${chatId}`]);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    typingChatUsers: {
      subscribe: (_, { chatId }, { pubSub }) => {
        try {
          // const chat = await Chat.findById(chatId).populate([
          //   { path: "chatUsers" },
          // ]);
          if (!chatId) {
            return;
          }
          setTimeout(() => {
            //   // pubSub.publish(`channel`, { [SubscriptionName]: data });
            pubSub.publish(`TYPING_CHAT_USERS-${chatId}`, {
              typingChatUsers: {
                id: chatId,
                users: typingUsers[chatId],
              },
            });
          }, 0);
          //     pubSub.asyncIterator([`channel`]);
          return pubSub.asyncIterator([`TYPING_CHAT_USERS-${chatId}`]);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    chatUsers: {
      subscribe: async (_, { chatId }, { pubSub }) => {
        try {
          const chat = await Chat.findById(chatId).populate([
            { path: "chatUsers" },
          ]);
          if (!chat) {
            return;
          }
          setTimeout(() => {
            // pubSub.publish(`channel`, { [SubscriptionName]: data });
            pubSub.publish(`CHAT_USERS-${chat._id}`, {
              chatUsers: {
                chatName: chat.chatName,
                users: chat.chatUsers,
              },
            });
          }, 0);
          //     pubSub.asyncIterator([`channel`]);
          return pubSub.asyncIterator([`CHAT_USERS-${chat._id}`]);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    userChats: {
      subscribe: async (_, { userId }, { pubSub }) => {
        try {
          const user = await User.findById(userId).populate([
            {
              path: "chats",
              //   populate: [
              //     { path: "chatAuthor" },
              //     { path: "chatUsers" },
              //   ],
            },
          ]);
          if (!user) {
            return;
          }
          setTimeout(() => {
            // pubSub.publish(`channel`, { [SubscriptionName]: data });
            pubSub.publish(`USER_CHATS-${user._id}`, { userChats: user.chats });
          }, 0);
          //     pubSub.asyncIterator([`channel`]);
          return pubSub.asyncIterator([`USER_CHATS-${user._id}`]);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    // =-=-=-=-=-=-=-=-=-=- End Subscriptions =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
    // =-=-=-=-=-=-=-=-=-=- End Subscriptions =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
  },
};

const { Chat } = require("../../models/Chat.model");
const { Message } = require("../../models/Message.model");

exports.MessageResolvers = {
  Query: {
    // messages: async (_, { chatId }) => {
    //   try {
    //     const messages = await Message.find({ chatId }).populate(
    //       "messageAuthor"
    //     );
    //     console.log({ messages });
    //     return messages;
    //   } catch (err) {
    //     console.log(err);
    //     return err;
    //   }
    // },
  },
  Mutation: {
    // (parent, args, context, info)
    addMessage: async (
      root,
      { data: { content, username, userId, chatId } },
      { pubSub }
    ) => {
      try {
        const newMessage = await Message.create({
          content,
          username,
          messageAuthor: userId,
          chatId,
        });

        // 1.One to get chatMessages is to add array property to Chat model and push each new message
        // 2.Another just find all chat messages through chatId that we add as property of the message. So I use 2nd method as it will be easy when we need to remove the messages!
        // const updatedChat = await Chat.findByIdAndUpdate(
        //   chatId,
        //   {
        //     $push: { chatMessages: newMessage._id },
        //   },
        //   { new: true, runValidators: true }
        // ).populate([
        //   // { path: "chatAuthor" },
        //   { path: "chatMessages", populate: [{ path: "messageAuthor" }] },
        // ]);
        // const messages = updatedChat.chatMessages

        // 2.Better way getting chat messages
        const messages = await Message.find({ chatId }).populate(
          "messageAuthor"
        );

        // Sent updated messages
        // const messages = await Message.find().populate("messageAuthor");
        pubSub.publish(`CHAT_MESSAGES-${chatId}`, {
          messages,
        });
        return newMessage;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    deleteMessage: async (root, { chatId, messageId, userId }, { pubSub }) => {
      try {
        let message;
        const foundMessage = await Message.findById(messageId).populate(
          "author"
        );
        if (foundMessage.messageAuthor._id.toString() === userId.toString()) {
          message = await Message.findByIdAndDelete(messageId);
          // console.log("msg deleted");
        } else {
          message = await Message.findByIdAndUpdate(
            messageId,
            {
              $push: { blackList: userId },
            },
            { new: true, runValidators: true }
          );
          // console.log("msg pushed to blackList");
        }
        const messages = await Message.find({ chatId }).populate(
          "messageAuthor"
        );
        pubSub.publish(`CHAT_MESSAGES-${chatId}`, {
          messages,
        });
        return message;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  Subscription: {
    messages: {
      subscribe: async (_, { chatId }, { pubSub }) => {
        try {
          // const chat = await Chat.findById(chatId).populate([
          //   // { path: "chatAuthor" },
          //   { path: "chatMessages", populate: [{ path: "messageAuthor" }] },
          // ]);

          // 2.Better way getting chat messages
          const messages = await Message.find({ chatId }).populate(
            "messageAuthor"
          );

          setTimeout(() => {
            pubSub.publish(`CHAT_MESSAGES-${chatId}`, {
              messages,
            });
          }, 0);
          return pubSub.asyncIterator(`CHAT_MESSAGES-${chatId}`);
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
  },
};

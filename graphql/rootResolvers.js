const { MessageResolvers } = require("./resolvers/messageResolvers");
const { AuthResolvers } = require("./resolvers/authResolvers");
const { ChatResolvers } = require("./resolvers/chatResolvers");
const { RoomResolvers } = require("./resolvers/roomResolvers");

exports.RootResolvers = {
  Query: {
    ...MessageResolvers.Query,
    ...AuthResolvers.Query,
    ...ChatResolvers.Query,
    ...RoomResolvers.Query,
  },
  Mutation: {
    ...MessageResolvers.Mutation,
    ...AuthResolvers.Mutation,
    ...ChatResolvers.Mutation,
    ...RoomResolvers.Mutation,
  },
  Subscription: {
    ...MessageResolvers.Subscription,
    ...ChatResolvers.Subscription,
    ...RoomResolvers.Subscription,
  },
};

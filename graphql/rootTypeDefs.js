const { gql } = require("apollo-server-express");

exports.RootTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    chats: [Chat!]
  }

  type Chat {
    id: ID!
    chatName: String!
    chatAuthor: User!
    # chatMessages: [Message!]
    chatUsers: [User!]
  }
  type Room {
    id: ID!
    roomName: String!
    roomAuthor: User!
    # roomMessages: [Message!]
    # roomUsers: [User!]
  }
  type Message {
    id: ID!
    chatId: ID!
    # hideMessage: Boolean!
    blackList: [ID]
    content: String!
    username: String!
    messageAuthor: User!
    createdAt: String!
  }

  input MessageInput {
    content: String!
    username: String!
    userId: ID!
    chatId: ID!
  }

  input SignupInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  type AuthData {
    userId: ID
    token: String
    tokenExpiration: Int
    message: String
  }

  type ResMessage {
    id: ID
    message: String!
  }

  type Query {
    messages: [Message]
    allUsers: [User!]!
    someUsers(page: Int!, limit: Int!): [User!]!
    userChats(userId: ID!): [Chat]
    chatUsers(chatId: ID!): [User!]
  }

  type Mutation {
    getUser(id: ID!): User
    signup(data: SignupInput!): User!
    login(email: String!, password: String!): AuthData!
    isLoggedIn(token: String!): AuthData!

    addMessage(data: MessageInput!): Message
    deleteMessage(chatId: ID!, messageId: ID!, userId: ID!): ResMessage

    createChat(userId: ID!, chatName: String!): Chat!
    deleteChat(chatId: ID!, userId: ID!): ResMessage!
    addChatUser(authorId: ID!, otherUserId: ID!, chatId: ID!): Chat
    deleteChatUser(authorId: ID!, otherUserId: ID!, chatId: ID!): ResMessage!
    searchedUser(email: String!): User
    updateChat(chatId: ID!, authorId: ID!, chatName: String!): Chat

    createRoom(userId: ID!, roomName: String!): Room!
    deleteTheRoom(userId: ID!, roomId: ID!): ID
  }

  type Subscription {
    messages(chatId: ID!): [Message]
    userChats(userId: ID!): [Chat]
    chatUsers(chatId: ID!): [User]
    userRooms(userId: ID!): [Room]
  }
`;

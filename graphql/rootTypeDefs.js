const { gql } = require("apollo-server-express");

exports.RootTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    image: String
    mode: String
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
    firstName: String!
    lastName: String!
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

  type ChatUsers {
    chatName: String!
    users: [User]
  }

  type TypingUser {
    id: ID!
    username: String!
  }
  type TypingUsers {
    id: ID!
    users: [TypingUser]
  }

  type OnlineUser {
    id: ID!
    firstName: String!
    lastName: String!
    image: String
  }

  type OnlineUsers {
    id: ID!
    users: [OnlineUser]
  }

  type Query {
    # messages(chatId: ID!): [Message]
    allUsers: [User!]!
    someUsers(page: Int!, limit: Int!): [User!]!
    # userChats(userId: ID!): [Chat]
    # chatUsers(chatId: ID!): [User!]
  }

  type Mutation {
    getUser(id: ID!): User
    searchedUser(email: String!): User
    signup(data: SignupInput!): User!
    login(email: String!, password: String!): AuthData!
    isLoggedIn(token: String!): AuthData!
    addMessage(data: MessageInput!): Message
    deleteMessage(chatId: ID!, messageId: ID!, userId: ID!): Message
    createChat(userId: ID!, chatName: String!): Chat!
    deleteChat(chatId: ID!, userId: ID!): ResMessage!
    updateChat(chatId: ID!, authorId: ID!, chatName: String!): Chat
    addChatUser(authorId: ID!, otherUserId: ID!, chatId: ID!): Chat
    deleteChatUser(authorId: ID!, otherUserId: ID!, chatId: ID!): ResMessage!
    searchedChats(chatName: String!, userId: ID!): [Chat]
    searchedChatUsers(username: String!, chatId: ID!): [User]
    userStartTyping(username: String!, userId: ID!, chatId: ID!): ID
    userStopTyping(userId: ID!, chatId: ID!): ID
    userOnline(
      userId: ID!
      chatId: ID!
      firstName: String!
      lastName: String!
      image: String
    ): ID
    userOffline(userId: ID!, chatId: ID!): ID

    createRoom(userId: ID!, roomName: String!): Room!
    deleteTheRoom(userId: ID!, roomId: ID!): ID

    updateUserTheme(mode: String!, userId: ID!): User
  }

  type Subscription {
    messages(chatId: ID!): [Message]
    userChats(userId: ID!): [Chat]
    chatUsers(chatId: ID!): ChatUsers
    userRooms(userId: ID!): [Room]
    typingChatUsers(chatId: ID!): TypingUsers
    onlineUsers(chatId: ID!): OnlineUsers
  }
`;

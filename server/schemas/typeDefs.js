const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    posts: [Post]
    friends: [User]
  }

  type Post {
    _id: ID
    postTitle: String
    postText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Community {
    _id: ID
    communityName: String
    communityBio: String
    users: [User]
    posts: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(ids: [ID!]!): [Post]
    post(_id: ID!): Post
    communities: [Community]
    community(_id: ID!): Community
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(postTitle: String!, postText: String!, communityId: ID!): Post
    addComment(postId: ID!, commentBody: String!): Post
    addFriend(friendId: ID!): User
    createCommunity(communityName: String!, communityBio: String!): Community
  }
`;

module.exports = typeDefs;

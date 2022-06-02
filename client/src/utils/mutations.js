import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_POST = gql``;

// export const ADD_COMMENT = gql``;

// export const ADD_FRIEND = gql``;

export const CREATE_COMMUNITY = gql`
  mutation Mutation($communityName: String!, $communityBio: String!) {
    createCommunity(
      communityName: $communityName
      communityBio: $communityBio
    ) {
      communityName
      _id
      communityBio
      users {
        username
      }
      posts {
        postTitle
      }
    }
  }
`;

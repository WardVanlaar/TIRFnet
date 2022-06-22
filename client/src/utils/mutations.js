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

export const ADD_POST = gql`
  mutation addPost($postTitle: String!, $postText: String!, $communityId: ID!) {
    addPost(
      postTitle: $postTitle
      postText: $postText
      communityId: $communityId
    ) {
      _id
      postTitle
      postText
      createdAt
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentBody: String!, $postId: ID!) {
    addComment(commentBody: $commentBody, postId: $postId) {
      _id
      commentBody
      username
      createdAt
      voteCount
    }
  }
`;

// export const ADD_FRIEND = gql``;

export const CREATE_COMMUNITY = gql`
  mutation createCommunity($communityName: String!, $communityBio: String!) {
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

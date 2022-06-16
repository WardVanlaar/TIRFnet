import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        createdAt
      }
    }
  }
`;

// export const QUERY_USERS = gql``;

// export const QUERY_USER = gql`
//   {
//     users {
//       username
//     }
//   }
// `;

// Thought this was necessary it is not
export const QUERY_POSTS = gql`
  query posts($ids: [ID!]!) {
    posts(_id: $ids) {
      _id
      postTitle
      postText
      createdAt
      username
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postTitle
      postText
      createdAt
      username
      comments {
        _id
        commentBody
        username
        createdAt
      }
    }
  }
`;

export const QUERY_COMMUNITIES = gql`
  {
    communities {
      communityName
      _id
    }
  }
`;

export const QUERY_COMMUNITY = gql`
  query community($id: ID!) {
    community(_id: $id) {
      _id
      communityName
      communityBio
      users {
        username
      }
      posts {
        _id
        postTitle
        postText
        createdAt
        username
        commentCount
      }
    }
  }
`;

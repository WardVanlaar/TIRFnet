import { gql } from "@apollo/client";

// export const QUERY_ME = gql``;

// export const QUERY_USERS = gql``;

// export const QUERY_USER = gql`
//   {
//     users {
//       username
//     }
//   }
// `;

// export const QUERY_POSTS = gql``;

// export const QUERY_POST = gql``;

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
        postTitle
        postText
        createdAt
        username
      }
    }
  }
`;

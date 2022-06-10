// Import Dependencies
import React from "react";
import { Link, useParams } from "react-router-dom";

// Import Components
import PostList from "../components/PostList";

// Import Utils
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_COMMUNITY } from "../utils/queries";

const SingleCommunity = (props) => {
  const { id: communityId } = useParams();

  const { loading, data } = useQuery(QUERY_COMMUNITY, {
    variables: { id: communityId },
  });

  const community = data?.community || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <p>{community.communityName}</p>
        </div>
        <div className="card-body">
          <p>{community.communityBio}</p>
        </div>
      </div>
      {Auth.loggedIn() && community.posts > 0 && (
        <PostList posts={community.posts} />
      )}
    </div>
  );
};

export default SingleCommunity;

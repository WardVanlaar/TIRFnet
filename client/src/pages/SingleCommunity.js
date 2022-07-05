// Import Dependencies
import React from "react";
import { useParams } from "react-router-dom";

// Import Components
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

// Import Utils
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_COMMUNITY } from "../utils/queries";

const SingleCommunity = (props) => {
  const { id: communityId } = useParams();

  const { loading, data } = useQuery(QUERY_COMMUNITY, {
    variables: { id: communityId },
  });

  const Community = data?.community || {};

  const loggedIn = Auth.loggedIn();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <p>{Community.communityName}</p>
        </div>
        <div className="card-body">
          <p>{Community.communityBio}</p>
        </div>
      </div>
      {loggedIn && (
        <div className="post-holder">
          <PostList posts={Community.posts} />
          <PostForm />
        </div>
      )}
    </div>
  );
};

export default SingleCommunity;

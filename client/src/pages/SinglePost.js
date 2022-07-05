// Import Dependencies
import React from "react";
import { useParams } from "react-router-dom";

// Import Components
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

// Import Utils
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const post = data?.post || {};

  const loggedIn = Auth.loggedIn();

  if (loading) {
    return <div>Loading...</div>;
  } else if (!loggedIn) {
    return <div> Please log in to view the post</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <p>{post.postTitle}</p>
        </div>
        <div className="card-body">
          <p>{post.postText}</p>
        </div>
      </div>
      <div className="comment-holder">
        <CommentList comments={post.comments} />
        <CommentForm />
      </div>
    </div>
  );
};

export default SinglePost;

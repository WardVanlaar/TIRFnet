import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <h3>No posts Yet</h3>;
  }

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h3>{post.postTitle}</h3>
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{" "}
              posted on {post.createdAt}
            </p>
            <div className="card-body">
              <p className="">{post.postText}</p>
              <Link to={`/post/${post._id}`}>
                <p className="mb-0">comments: {post.commentCount}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;

import React from "react";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  if (!comments) {
    return <h3>No comments Yet</h3>;
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id} className="card mb-3">
            <p>{comment.commentBody}</p>
            <p className="card-header">
              <Link
                to={`/${comment.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {comment.username}
              </Link>{" "}
              commented on {comment.createdAt}
            </p>
            <p className="">{comment.voteCount}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentList;

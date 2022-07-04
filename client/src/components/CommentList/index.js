import React from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPVOTE, DOWNVOTE } from "../../utils/mutations";
import { QUERY_POST } from "../../utils/queries";

const CommentList = ({ comments }) => {
  const { id: postId } = useParams();

  const [upvote] = useMutation(UPVOTE);
  const [downvote] = useMutation(DOWNVOTE);

  const handleUpVote = async (event, commentId) => {
    event.preventDefault();
    console.log(commentId);
    await upvote({ variables: { commentId } });
  };

  const handleDownVote = async (event, commentId) => {
    event.preventDefault();
    console.log(commentId);
    await downvote({ variables: { commentId } });
  };

  if (!comments) {
    return <h3>No comments Yet</h3>;
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id} className="card mb-3">
            <button onClick={(event) => handleUpVote(event, comment._id)}>
              vote
            </button>
            <button onClick={(event) => handleDownVote(event, comment._id)}>
              unvote
            </button>
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
            <p className="voteCount">{comment.votes}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentList;

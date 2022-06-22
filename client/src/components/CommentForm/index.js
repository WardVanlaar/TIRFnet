import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_POST } from "../../utils/queries";

const CommentForm = () => {
  const [commentBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const { id: postId } = useParams();

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        // update community post object's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { post } = cache.readQuery({
          query: QUERY_POST,
          variables: { id: postId },
        });
        console.log(post);
        cache.writeQuery({
          query: QUERY_POST,
          variables: { id: postId },
          data: {
            post: { ...post, comments: [...post.comments, addComment] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // update post text state based on target form value
  const handleChangeBody = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentBody, postId },
      });

      // clear form value
      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="comment-form">
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Comment Body"
          value={commentBody}
          className="form-input col-12 col-md-9"
          onChange={handleChangeBody}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Create Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;

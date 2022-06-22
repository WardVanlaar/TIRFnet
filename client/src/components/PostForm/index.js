import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_COMMUNITY } from "../../utils/queries";

const PostForm = () => {
  const [postTitle, setTitle] = useState("");
  const [postText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const { id: communityId } = useParams();

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        // update community post object's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { community } = cache.readQuery({
          query: QUERY_COMMUNITY,
          variables: { id: communityId },
        });
        console.log(community);
        cache.writeQuery({
          query: QUERY_COMMUNITY,
          variables: { communityId },
          data: {
            community: { ...community, posts: [...community.posts, addPost] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // update post text state based on target form value
  const handleChangeText = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // update post title state based on target form value
  const handleChangeTitle = (event) => {
    if (event.target.value) {
      setTitle(event.target.value);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { postText, postTitle, communityId },
      });

      // clear form value
      setTitle("");
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="post-form">
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
          placeholder="Post Title"
          value={postTitle}
          className="form-input col-12 col-md-9"
          onChange={handleChangeTitle}
        ></textarea>
        <textarea
          placeholder="Post Content"
          value={postText}
          className="form-input col-12 col-md-9"
          onChange={handleChangeText}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;

import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_COMMUNITY } from "../../utils/mutations";
import { QUERY_COMMUNITIES } from "../../utils/queries";

const CommunityForm = () => {
  const [communityName, setName] = useState("");
  const [communityBio, setBio] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [createCommunity, { error }] = useMutation(CREATE_COMMUNITY, {
    update(cache, { data: { createCommunity } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { communities } = cache.readQuery({ query: QUERY_COMMUNITIES });
        cache.writeQuery({
          query: QUERY_COMMUNITIES,
          data: { communities: [createCommunity, ...communities] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // update state based on form input changes
  const handleChangeName = (event) => {
    if (event.target.value.length <= 280) {
      setName(event.target.value);
    }
  };
  const handleChangeBio = (event) => {
    if (event.target.value.length <= 280) {
      setBio(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createCommunity({
        variables: { communityName, communityBio },
      });

      // clear form value
      setName("");
      setBio("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
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
          placeholder="Community Name"
          value={communityName}
          className="form-input col-12 col-md-9"
          onChange={handleChangeName}
        ></textarea>
        <textarea
          placeholder="Community Bio"
          value={communityBio}
          className="form-input col-12 col-md-9"
          onChange={handleChangeBio}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommunityForm;

import React from "react";
import CommunitiesList from "../components/CommunitiesList";
import CommunityForm from "../components/CommunityForm";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_COMMUNITIES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_COMMUNITIES);
  const Communities = data?.communities || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommunitiesList
              communities={Communities}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && (
          <div className="col-12 mb-3">
            <CommunityForm />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;

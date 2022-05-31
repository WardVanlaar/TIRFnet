import React from "react";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <h1> Test </h1>
      </div>
    </main>
  );
};

export default Home;

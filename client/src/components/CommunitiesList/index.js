import React from "react";
import { Link } from "react-router-dom";

const CommunitiesList = ({ communities }) => {
  return (
    <div>
      {communities &&
        communities.map((community) => (
          <div key={community._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/community/${community.communityName}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {community.communityName}
              </Link>{" "}
            </p>
          </div>
        ))}
    </div>
  );
};

export default CommunitiesList;

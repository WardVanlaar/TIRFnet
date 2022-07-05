const { Schema, model } = require("mongoose");

const communitySchema = new Schema(
  {
    communityName: {
      type: String,
      required: true,
      trim: true,
    },
    communityBio: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    // Add Groups type to schema in future edition
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Community = model("Community", communitySchema);

module.exports = Community;

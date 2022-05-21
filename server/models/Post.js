const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment.js");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 2000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Post = model("Post", postSchema);

module.exports = Post;

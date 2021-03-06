const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Community, Comment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("posts")
        .populate("friends");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("posts");
    },
    // currently not necessary
    posts: async (parent, { ids }) => {
      return Post.find()
        .where({ _id: { $in: ids } })
        .sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id }).populate("comments");
    },
    communities: async () => {
      return Community.find()
        .select("-__v")
        .populate("posts")
        .populate("users");
    },
    community: async (parent, { _id }) => {
      return Community.findOne({ _id })
        .select("-__v")
        .populate("posts")
        .populate("users");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          postTitle: args.postTitle,
          postText: args.postText,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        await Community.findByIdAndUpdate(
          { _id: args.communityId },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentBody: args.commentBody,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: comment._id } },
          { new: true }
        );

        await Post.findByIdAndUpdate(
          { _id: args.postId },
          { $push: { comments: comment._id } },
          { new: true }
        );

        return comment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    createCommunity: async (parent, args, context) => {
      if (context.user) {
        const community = await Community.create({
          ...args,
          users: context.user._id,
        });

        return community;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    upvote: async (parent, args, context) => {
      if (context.user) {
        const updatedcomment = await Comment.findByIdAndUpdate(
          { _id: args.commentId },
          { $addToSet: { votes: context.user._id } },
          { new: true }
        ).populate("votes");

        return updatedcomment;
      }
    },
    downvote: async (parent, args, context) => {
      if (context.user) {
        const updatedcomment = await Comment.findByIdAndUpdate(
          { _id: args.commentId },
          { $pull: { votes: context.user._id } },
          { new: true }
        ).populate("votes");

        return updatedcomment;
      }
    },
  },
};

module.exports = resolvers;

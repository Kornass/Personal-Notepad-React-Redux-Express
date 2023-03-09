const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Post = require("../models/postModel");

const getPosts = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

const getSinglePost = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  // Getting sure if it is a user's post
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.status(200).json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const { type, post } = req.body;
  if (!type) {
    res.status(400);
    throw new Error("Please pick the post type");
  }
  if (!post) {
    res.status(400);
    throw new Error("Post cannot be empty!");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const createPost = await Post.create({
    type,
    post,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(createPost);
});

const deletePost = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  // Getting sure if it is a user's post
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await post.remove();

  res.status(200).json({ success: true });
});

const updatePost = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  // Getting sure if it is a user's post
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

module.exports = {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
};

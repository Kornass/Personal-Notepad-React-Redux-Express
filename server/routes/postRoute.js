const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

// With .route() we can specify an endpoint and chain requests to it
router.route("/").get(protect, getPosts).post(protect, createPost);
router
  .route("/:id")
  .get(protect, getSinglePost)
  .delete(protect, deletePost)
  .put(protect, updatePost);

module.exports = router;

const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Please add a post type "],
      enum: ["News", "Science", "Sport", "Entertainment", "Reminder", "Food"],
    },
    post: { type: String, required: [true, "Post cannot be empty!"] },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("post", postSchema);

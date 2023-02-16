const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include fields");
  }
  res.send("register");
});

const loginUser = asyncHandler(async (req, res) => {
  res.send("login");
});

module.exports = {
  registerUser,
  loginUser,
};

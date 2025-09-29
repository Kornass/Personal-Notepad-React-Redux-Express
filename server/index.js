const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: ["https://personal-notepad-react-redux.vercel.app"], // exact match
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // only if you actually use cookies
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // must be BEFORE routes
app.options("*", cors(corsOptions)); // handle preflight globally

// app.use(
//   cors({
//     origin: "https://personal-notepad-react-redux.vercel.app",
//   })
// );
// app.options("/*", (_, res) => {
//   res.sendStatus(200);
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

if (process.env.VERCEL) {
  // On Vercel: export a handler, DO NOT listen
  module.exports = (req, res) => app(req, res);
} else {
  // Local dev:
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

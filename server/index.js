const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

app.use((req, _res, next) => {
  console.log("REQ", req.method, req.url);
  next();
});

const corsOptions = {
  origin: ["https://personal-notepad-react-redux.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

if (process.env.VERCEL) {
  module.exports = (req, res) => app(req, res);
} else {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 6000;
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "https://personal-notepad-react-redux.vercel.app",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

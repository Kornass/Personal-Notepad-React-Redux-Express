const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/users", require("./routes/userRoutes"));

//! HEROKU SETUP CODE - OLD HOSTING CONFIG
// Serving production build
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(__dirname, "../", "client", "build", "index.html")
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome" });
//   });
// }
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

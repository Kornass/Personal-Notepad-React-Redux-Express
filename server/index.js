const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 6000;
const app = express();
// allows us to send json body
app.use(express.json());
// allows us to send body with urlencoded
app.use(express.urlencoded({ extended: false }));
//connect to database
connectDB();

app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/users", require("./routes/userRoutes"));
// Server frontend
if (process.env.NODE_ENV === "production") {
  // we are serving our static build folder from react npm run build
  app.use(express.static(path.join(__dirname, "../client/build")));
  // loading index.html that is in the build folder
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

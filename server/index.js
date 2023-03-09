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
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

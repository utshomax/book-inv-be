import bodyParser from "body-parser";
import express from "express";

import connectDB from "./config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import book from "./routes/api/book";
require("dotenv").config();
const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
};

const app = express();

//app.use(cors(corsOption));
app.use(cors())

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/book", book);

const server = app.listen(5000, () =>{
  // Connect to MongoDB
  connectDB();
  console.log(`Server started on port ${5000}`)
}
);
export default server;

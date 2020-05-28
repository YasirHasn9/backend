const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

const userRouter = require("../users/users-router");
const songsRouter = require("../songs/songs-router");
const authRouter = require("../auth/auth-router");
const { restrictedAuth } = require("../middleware/restrictedAuth");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(cookieParser());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/songs", songsRouter);
server.get("/api", (req, res) => {
  res.json({ message: "Up" });
});
// restrictedAuth()
server.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong with the server" });
});
module.exports = server;

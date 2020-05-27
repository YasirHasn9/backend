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

server.use("/api/users", restrictedAuth(), userRouter);
server.use("/api/auth", authRouter);
server.use("/api/songs", restrictedAuth(), songsRouter);
server.get("/api", (req, res) => {
  res.json({ message: "Up" });
});

module.exports = server;

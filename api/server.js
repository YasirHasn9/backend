const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

const { restrictedAuth } = require("../middleware/restrictedAuth");

const userRouter = require("../users/users-router");
const songsRouter = require("../songs/songs-router");
const authRouter = require("../auth/auth-router");

server.use(express.json());
server.use(helmet());
server.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);
server.use(cookieParser());

server.use("/api/auth", authRouter);
server.use("/api/users", restrictedAuth(), userRouter);
server.use("/api/songs", songsRouter);

server.get("/api", (req, res) => {
  res.json({ message: "Up" });
});
//
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Bad mistake, Server!"
  });
});
module.exports = server;

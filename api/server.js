const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.get("/api", (req, res) => {
  res.json({ message: "Up" });
});

module.exports = server;

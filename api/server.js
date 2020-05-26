const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/api", (req, res) => {
  res.json({ message: "Up" });
});

module.exports = server;

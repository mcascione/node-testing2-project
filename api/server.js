const express = require("express");

const Plants = require("../api/plants/plants-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use("/plants", Plants);

module.exports = server;

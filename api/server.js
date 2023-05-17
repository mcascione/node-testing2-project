const express = require("express");

const Plants = require("../api/plants/plants-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use("/plants", Plants);

//eslint-disable-next-line
server.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = server;

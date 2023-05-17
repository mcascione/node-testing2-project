const express = require("express");
const Plants = require("./plants-model");
const router = express.Router();

router.get("/", (req, res) => {
  Plants.getAll()
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        customMessage: "unable to fetch plants",
      });
    });
});

module.exports = router;

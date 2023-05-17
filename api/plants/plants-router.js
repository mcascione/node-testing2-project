const express = require("express");
const Plant = require("./plants-model");
const { checkID } = require("./plants-middleware");
const router = express.Router();

router.get("/", (req, res) => {
  Plant.getAll()
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

router.get("/:id", checkID, (req, res, next) => {
  Plant.getByID(req.params.id)
    .then((plant) => {
      res.status(200).json(plant);
    })
    .catch(next);
});

module.exports = router;

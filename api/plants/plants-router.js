const express = require("express");
const Plant = require("./plants-model");
const { checkID } = require("./plants-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Plant.getAll()
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch(next)
});

router.get("/:id", checkID, (req, res, next) => {
  Plant.getByID(req.params.id)
    .then((plant) => {
      res.status(200).json(plant);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {});

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;

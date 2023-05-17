const express = require("express");
const Plant = require("./plants-model");
const { checkID } = require("./plants-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Plant.getAll()
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch(next);
});

router.get("/:id", checkID, (req, res, next) => {
  Plant.getByID(req.params.id)
    .then((plant) => {
      res.status(200).json(plant);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Plant.insert(req.body)
    .then((newPlant) => {
      res.status(201).json(newPlant);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Plant.update(req.params.id, req.body)
    .then((updatedPlant) => {
        res.status(200).json(updatedPlant)
    })
    .catch(next)
});

router.delete("/:id", (req, res, next) => {});

module.exports = router;

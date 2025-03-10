const express = require("express");
const Plant = require("./plants-model");
const { checkID, validateBody } = require("./plants-middleware");
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

router.post("/", validateBody, (req, res, next) => {
  Plant.insert(req.body)
    .then((newPlant) => {
      res.status(201).json(newPlant);
    })
    .catch(next);
});

router.put("/:id", validateBody, (req, res, next) => {
  Plant.update(req.params.id, req.body)
    .then((updatedPlant) => {
      res.status(200).json(updatedPlant);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Plant.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `plant with id:${req.params.id} deleted`,
      });
    })
    .catch(next);
});

module.exports = router;

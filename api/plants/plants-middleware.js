const Plant = require("./plants-model");

async function checkID(req, res, next) {
  const idExists = await Plant.getByID(req.params.id);
  if (idExists) {
    next();
  } else {
    next({
      status: 404,
      message: `plant with id:${req.params.id} does not exist`,
    });
  }
}

function validateBody(req, res, next) {
  const { name, family, purchased } = req.body;
  if (!name || typeof name !== "string") {
    next({ status: 422, message: "valid name is required" });
  } else if (!family || typeof family !== "string") {
    next({ status: 422, message: "valid plant family name is required" });
  } else if (name.trim().length > 50 || family.trim().length > 50) {
    next({
      status: 422,
      message: "name and family must be less than 50 characters each",
    });
  } else if (purchased === undefined) {
    next({ status: 422, message: "purchased must be true(1) or false(0)" });
  } else {
    next()
  }
}

module.exports = {
  checkID,
  validateBody
};

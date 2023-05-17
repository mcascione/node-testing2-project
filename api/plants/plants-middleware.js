const Plants = require("./plants-model");

async function checkID(req, res, next) {
  const idExists = await Plants.getByID(req.params.id);
  if (idExists) {
    next();
  } else {
    next({
      status: 404,
      message: `plant with id:${req.params.id} does not exist`,
    });
  }
}

module.exports = {
  checkID,
};

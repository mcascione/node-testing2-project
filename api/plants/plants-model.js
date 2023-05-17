const db = require("../../data/dbConfig");

function getAll() {
  return db("plants");
}

function getByID(id) {
  return db("plants").where("id", id).first();
}

function insert() {}
function update() {}
function remove() {}

module.exports = {
  getAll,
  getByID,
  insert,
  update,
  remove,
};

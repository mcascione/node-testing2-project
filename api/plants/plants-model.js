const db = require("../../data/dbConfig");


function getAll() {
  return db("plants");
}

function getByID() {}
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
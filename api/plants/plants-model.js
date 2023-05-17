const db = require("../../data/dbConfig");

function getAll() {
  return db("plants");
}

function getByID(id) {
  return db("plants").where("id", id).first();
}

async function insert(plant) {
  return await db("plants")
    .insert(plant)
    .then(([id]) => {
      return db("plants").where("id", id).first();
    });
}

async function update(id, changes) {
const {name, family, purchased} = changes
  return await db("plants")
    .update({name, family, purchased})
    .where("id", id)
    .then(() => {
        return db("plants").where("id", id).first()
    })
}


function remove(id) {
  return db("plants").delete().where("id", id)
}

module.exports = {
  getAll,
  getByID,
  insert,
  update,
  remove,
};

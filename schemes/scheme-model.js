const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(scheme_id) {
  return db("steps as s")
    .join("schemes as sc", "sc.id", "s.scheme_id")
    .select("s.step_number", "sc.scheme_name", "s.instructions")
    .where({ scheme_id })
    .orderBy("s.step_number", "asc");
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return findById(id);
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

const db = require("../db/db-config");

module.exports = {
  find,
  add
};

function find() {
  return db("users");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findByUserId(id);
  } catch (err) {
    console.log("users : models: add", add);
    throw err;
  }
}

function findByUserId(id) {
  return db("users")
    .where({ id })
    .first();
}

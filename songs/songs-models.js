const db = require("../db/db-config");

module.exports = {
  find,
  findSongById,
  add,
  findBy,
  remove,
  update
};

function find() {
  return db("songs")
}

function findSongById(id) {
  return db("songs")
    .where({ id })
    .first();
}

async function add(song) {
  try {
    const [id] = await db("songs").insert(song);
    return findSongById(id);
  } catch (err) {
    console.log("songs model add", err);
  }
}

function findBy(filter) {
  return db("songs")
    .where(filter)
    .first();
}

function remove(id) {
  return db("songs")
    .where({ id })
    .del();
}

async function update(id, change) {
  try {
    await db("songs")
      .where({ id })
      .update(change);
    return findBy({ id });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

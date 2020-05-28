const db = require("../db/db-config");

module.exports = {
  find,
  add,
  findByUserId,
  findBy,
  remove,
  update,
  getUserSong
};
function find() {
  return db("users").select("id", "username");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findByUserId(id).select("username");
  } catch (err) {
    throw err;
  }
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}
function findByUserId(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username");
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

async function update(id, change) {
  try {
    await db("users")
      .where({ id })
      .update(change);
    return findBy({ id }).select("id", "username");
  } catch (err) {
    throw err;
  }
}

async function getUserSong(user_id) {
  return db("user_song as us")
    .join("users as u", "u.id", "us.song_id")
    .join("songs as s", "s.id", "us.song_id")
    .where("u.id", user_id)
    .select(
      "u.id",
      "u.username",
      "s.title",
      "s.song_by",
      "s.released_year",
      "s.favorite"
    );
}

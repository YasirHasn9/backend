const db = require("../db/db-config");

module.exports = {
  find,
  findSongById,
  add,
  findBy

  //   remove,
  //   update,
  //   getComments,
  //   addComment,
  //   removeComment,
  //   getCommentById,
  //   getPendingStories,
};

function find() {
  return db("songs").where({ favorite: false });
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
  return db("songs").where(filter);
}

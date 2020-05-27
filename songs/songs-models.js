const db = require("../db/db-config");

module.exports = {
  find,

findSongById

};

function find() {
  return db("songs").where({ favorite: false });
}

function findSongById(id) {
  return db("songs")
    .where({ id })
    .first();
}

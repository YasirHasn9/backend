const db = require("../db/db-config");

module.exports = {
  find
};

function find() {
  return db("songs").where({ favorite: false });
}

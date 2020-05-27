exports.seed = async function(knex) {
  await knex("users").insert([
    { username: "Yasir", password: "pass" },
    { username: "Luis", password: "pass" },
    { username: "Jason", password: "pass" }
  ]);
};

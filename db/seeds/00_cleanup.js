exports.seed = async function(knex) {
  await knex("user_song").del();
  await knex("songs").del();
  await knex("users").del();
};

exports.seed = async function(knex) {
  await knex("user_song").truncate();
  await knex("songs").truncate();
  await knex("users").truncate();
};

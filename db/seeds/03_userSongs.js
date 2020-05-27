exports.seed = async function(knex) {
  await knex("user_song").insert([
    {  user_id: 1, song_id: 1 }
  ]);
};

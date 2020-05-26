exports.up = async function(knex) {
  await knex.schema.createTable("users", user => {
    user.increments("id");
    user
      .string("username", 225)
      .notNullable()
      .unique()
      .index();
    user.string("password", 255).notNullable();
  });

  await knex.schema.createTable("songs", song => {
    song.increments("id");
    song.string("title").notNullable();
    song
      .string("song_by")
      .notNullable()
    song.integer("released_year");
    song.boolean("favorite").defaultTo(false);
  });

  await knex.schema.createTable("user_song", userSong => {
    userSong.increments("id");
    userSong
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    userSong
      .integer("song_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("songs")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("user_song");
  await knex.schema.dropTableIfExists("songs");
  await knex.schema.dropTableIfExists("users");
};

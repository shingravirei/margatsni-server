exports.up = (knex) =>
    knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();

            table.string('username').unique().notNullable();

            table.string('email').unique().notNullable();

            table.string('hash').notNullable();

            table.timestamps();
        })
        .createTable('posts', (table) => {
            table.increments('id').primary();

            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');

            table.integer('likes').unsigned().defaultTo(0);

            table.string('text');

            table.json('img_links').notNullable();

            table.timestamps();
        });

exports.down = (knex) =>
    knex.schema.dropTableIfExists('users').dropTableIfExists('posts');

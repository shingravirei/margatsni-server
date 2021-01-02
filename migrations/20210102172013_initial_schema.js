exports.up = (knex) =>
    knex.schema.createTable('users', (table) => {
        table.increments('id').primary();

        table.string('username').unique().notNullable();

        table.string('email').unique().notNullable();

        table.string('hash').notNullable();

        table.timestamps();
    });

exports.down = (knex) => knex.schema.dropTable('users');

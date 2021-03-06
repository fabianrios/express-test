
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.text('password').notNullable();
    table.boolean('admin').notNullable();
    table.string('email').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

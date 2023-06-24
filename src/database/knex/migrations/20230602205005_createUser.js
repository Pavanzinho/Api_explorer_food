
exports.up = knex=> knex.schema.createTableIfNotExists('users', table=> {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('status');
    table.boolean('is_admin').notNullable();
  })

exports.down = knex=>knex.schema.dropTable('users')
  
;

exports.up = knex=>knex.schema.createTableIfNotExists('ingredients', table=> {
    table.increments('id').primary();
    table.integer('plate_id').references('id').inTable('plates').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');
    table.text('name');
  })

exports.down = knex=>knex.schema.dropTable("ingredients");

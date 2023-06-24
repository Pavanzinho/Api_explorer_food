
exports.up = knex=>knex.schema.createTableIfNotExists("plates", table=>{
    table.increments('id').primary();
    table.string('avatar');
    table.text('plate_title');
    table.text('plate_description');
    table.text('plate_price');
    table.string("plate_category").notNullable().defaultTo("refeições")
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex=>knex.schema.dropTable("plates");


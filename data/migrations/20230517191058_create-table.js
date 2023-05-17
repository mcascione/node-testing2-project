exports.up = function (knex) {
  return knex.schema.createTable("plants", (tbl) => {
    tbl.increments();
    tbl.string("name").unique().notNullable();
    tbl.string("family").notNullable();
    tbl.boolean("purchased").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("plants");
};

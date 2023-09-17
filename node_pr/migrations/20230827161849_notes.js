/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments("_id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.boolean("isActive");
    table.boolean("isArchived");
    table.timestamp('created').defaultTo(knex.fn.now());
    table.string("title", 255).notNullable();
    table.text("html");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("notes");
};

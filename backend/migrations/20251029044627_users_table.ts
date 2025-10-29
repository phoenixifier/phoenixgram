import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.hasTable("users").then(async function (exists) {
		if (!exists) {
			return knex.schema.createTable("users", async function (table) {
				table.increments("id").primary().unsigned();
				table.string("username", 50).unique().notNullable();
				table.string("full_name", 50).notNullable();
				table.string("email", 50).unique().notNullable();
				table.string("password_hash", 255).notNullable();
				table.text("avatar");
				table.string("bio", 100);
				table.integer("following_count").unsigned().defaultTo(0);
				table.integer("followers_count").unsigned().defaultTo(0);
				table.integer("posts_count").unsigned().defaultTo(0);
				table.timestamp("created_at").defaultTo(knex.fn.now());
				table.timestamp("updated_at").defaultTo(knex.fn.now());
			});
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("users");
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.hasTable("posts").then((exists) => {
		if (!exists) {
			return knex.schema.createTable("posts", (table) => {
				table.increments("id").primary().unsigned();
				table.integer("user_id").unsigned();
				table
					.foreign("user_id")
					.references("id")
					.inTable("users")
					.onDelete("CASCADE");

				table.text("media").notNullable();
				table.string("caption", 100).notNullable();
				table.integer("likes_count").unsigned().defaultTo(0);
				table.integer("comments_count").notNullable().unsigned().defaultTo(0);
				table.timestamp("created_at").defaultTo(knex.fn.now());
				table.timestamp("updated_at").defaultTo(knex.fn.now());
			});
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("posts");
}

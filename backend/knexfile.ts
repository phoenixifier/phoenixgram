import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "pg",
		connection: {
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		},
	},

	staging: {
		client: "postgresql",
		connection: {
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "migrations",
			extension: "ts",
		},
	},

	production: {
		client: "postgresql",
		connection: {
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default config;

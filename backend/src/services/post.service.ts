import pool from "../database/connection.ts";

class PostService {
	public async createTables() {
		const users_table = `CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
		username VARCHAR(50) UNIQUE NOT NULL,
		full_name VARCHAR(50) NOT NULL,
		email VARCHAR(50) UNIQUE NOT NULL,
		password_hash VARCHAR(255) NOT NULL,
		avatar TEXT,
		bio VARCHAR(100),
		following_count INTEGER DEFAULT 0,
		followers_count INTEGER DEFAULT 0,
		posts_count INTEGER DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`;

		const posts_table = `CREATE TABLE IF NOT EXISTS posts(
    post_id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL,
    media TEXT UNIQUE,
    caption VARCHAR(100) NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE        
    )`;
	}
}

export default PostService;

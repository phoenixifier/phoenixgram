import { Post } from "../models/post.model.ts";
import db from "../database/db.ts";

class PostRepository {
	private entity = "posts";

	async findAll(): Promise<Post[]> {
		return db<Post>(this.entity).select("*");
	}
}

export default PostRepository;

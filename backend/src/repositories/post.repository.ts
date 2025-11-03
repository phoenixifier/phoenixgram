import db from "../database/db.ts";
import { Post } from "../models/post.model.ts";
import UserRepository from "./user.repository.ts";

class PostRepository {
	private postEntity = "posts";
	private userRepository: UserRepository = new UserRepository();

	async findAll(): Promise<Post[]> {
		return db<Post>(this.postEntity).select("*");
	}

	async findById(post_id: number): Promise<Post | undefined> {
		return db<Post>(this.postEntity).where("id", post_id).first();
	}

	async create(post: Partial<Post>): Promise<Post | undefined> {
		return await db.transaction(async (trx) => {
			const [createdPost] = await trx<Post>(this.postEntity)
				.insert(post)
				.returning("*");

			return createdPost;
		});
	}

	async update(post: Post, post_id: number): Promise<Post | undefined> {
		return db<Post>(this.postEntity).where("id", post_id).update({
			caption: post.caption,
		});
	}

	async delete(post_id: number): Promise<Post> {
		return db<Post>(this.postEntity).where("id", post_id).del();
	}
}

export default PostRepository;

import { NextFunction, Request, Response } from "express";
import PostRepository from "../repositories/post.repository.ts";

class PostController {
	private postRepository: PostRepository = new PostRepository();
	public getPosts = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const posts = await this.postRepository.findAll();
			res.status(200).json({ success: true, data: posts });
		} catch (error) {
			console.error("Error while getting posts", error);
			res.status(500).json({ error: "Failed to get posts" });
			next(error);
		}
	};
}

export default PostController;

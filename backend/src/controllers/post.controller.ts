import { NextFunction, Request, Response } from "express";
import PostService from "../services/post.service";

class PostController {
	private postService = new PostService();

	public getPosts = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const posts = await this.postService.getAll();
			res.status(200).json({ success: true, data: posts });
		} catch (error) {
			console.error(error, "Error while getting posts");
			res.status(500).json({ error: "Failed to get posts" });
			next(error);
		}
	};
}

export default PostController;

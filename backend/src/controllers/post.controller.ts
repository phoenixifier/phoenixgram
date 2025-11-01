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

	public getPost = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const post = await this.postRepository.findById(Number(id));

			if (!post) {
				res.status(404).json({ error: "Post not found" });
			}

			res.status(200).json({ success: true, data: post });
		} catch (error) {
			console.error("Error while getting post", error);
			res.status(500).json({ error: "Failed to get the post" });
			next(error);
		}
	};

	public createPost = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await this.postRepository.create(req.body);
			res
				.status(201)
				.json({ success: true, data: "Post created successfully!" });
		} catch (error) {
			console.error("Error while creating a new post", error);
			res.status(500).json({ error: "Failed to create a new post" });
			next(error);
		}
	};

	public updatePost = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const { id } = req.params;
		const post = req.body;
		try {
			await this.postRepository.update(post, Number(id));
			res.status(200).json({ success: true, data: post });
		} catch (error) {
			console.error("Error while updating the post", error);
			res.status(500).json({ error: "Failed to update the post" });
			next(error);
		}
	};

	public deletePost = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const deletedPost = await this.postRepository.delete(Number(id));

			if (!deletedPost) {
				res.status(404).json({ message: "Post not found" });
			}

			res.status(204).json({ success: true, data: deletedPost });
		} catch (error) {
			console.error("Error while deleting the post", error);
			res.status(500).json({ error: "Failed to delete post" });
			next(error);
		}
	};
}

export default PostController;

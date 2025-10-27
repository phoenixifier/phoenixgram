import { Request, Response, NextFunction } from "express";
import { Post, posts } from "../models/post";

export const createPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { user_id, media, caption, likes_count, comments_count } = req.body;
		const newPost: Post = {
			user_id,
			media,
			caption,
			likes_count,
			comments_count,
		};
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const getPosts = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		res.json(posts);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

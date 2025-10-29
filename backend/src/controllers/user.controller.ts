import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository.ts";
import { User } from "../models/user.model.ts";

class UserController {
	private userRepository: UserRepository = new UserRepository();

	public getUsers = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const users = await this.userRepository.findAll();
			res.status(200).json({ success: true, data: users });
		} catch (err) {
			res.status(500).json({ success: false, message: "Failed to get users" });
			console.error("Error while getting users", err);
			next(err);
		}
	};

	public createUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await this.userRepository.create(req.body);
			res
				.status(201)
				.json({ success: true, data: "User created successfully!" });
		} catch (err) {
			res
				.status(500)
				.json({ success: false, message: "Failed to create a user" });
			console.error("Error while adding user", err);
			next(err);
		}
	};
}

export default UserController;

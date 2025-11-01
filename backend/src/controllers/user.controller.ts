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

	public getUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await this.userRepository.findById(Number(id));
			if (!user) {
				res.status(404).json({ error: "User not found" });
			}
			res.status(200).json({ success: true, data: user });
		} catch (error) {
			console.error("Error while getting user", error);
			res.status(500).json({ error: "Failed to get the user" });
			next(error);
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

	public updateUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = req.body;
			await this.userRepository.update(user, Number(id));

			if (!user) {
				res.status(404).json({ error: "User not found" });
			}

			res.status(200).json({ success: true, data: user });
		} catch (error) {
			console.error("Error while updating user", error);
			res.status(500).json({ error: "Failed to update the user" });
			next(error);
		}
	};

	public deleteUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const deletedUser = await this.userRepository.delete(Number(id));

			if (!deletedUser) {
				res.status(404).json({ error: "User not found" });
			}

			res.status(204).json({ success: true, data: deletedUser });
		} catch (error) {
			console.error("Error while deleting the user", error);
			res.status(500).json({ error: "Failed to delete the user" });
			next(error);
		}
	};
}

export default UserController;

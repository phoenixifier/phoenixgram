import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRepository from "../repositories/auth.repository.ts";
import { User } from "../models/user.model.ts";
import config from "../config/config.ts";

class AuthController {
	private authRepository = new AuthRepository();

	public login = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const { username, password_hash } = req.body;
		const user = await this.authRepository.findByUsername(username);

		if (!user) {
			res.status(404).json({ error: "User not found" });
		}

		const passwordMatch = await bcrypt.compare(
			password_hash,
			user!.password_hash,
		);

		if (!passwordMatch) {
			res.status(401).json({ error: "Invalid credentials" });
		}

		// @ts-ignore
		const token = jwt.sign({ id: user!.id }, config.jwtSecret, {
			expiresIn: config.jwtExpiresIn,
		});
	};
}

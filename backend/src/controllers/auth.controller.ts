import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRepository from "../repositories/auth.repository.ts";
import config from "../config/config.ts";
import UserRepository from "../repositories/user.repository.ts";

class AuthController {
	private authRepository = new AuthRepository();
	private userRepository: UserRepository = new UserRepository();

	public register = async (req: Request, res: Response) => {
		try {
			const { email, username, full_name, password_hash } = req.body;
			const existingUser = await this.authRepository.findByEmail(email);

			if (existingUser) {
				return res
					.status(409)
					.json({ success: false, error: "Email already exists" });
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password_hash, salt);

			const newUser = await this.userRepository.create({
				email,
				username,
				full_name,
				password_hash: hashedPassword,
			});

			// @ts-ignore
			const token = jwt.sign(
				{ id: newUser.id, username, email },
				config.jwtSecret,
				{
					expiresIn: config.jwtExpiresIn,
				},
			);

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 900000,
			});

			return res.status(200).json({ success: true, user: newUser });
		} catch (error: any) {
			return res.status(400).json({ success: false, error: error.message });
		}
	};

	public login = async (req: Request, res: Response) => {
		try {
			const { username, password_hash } = req.body;
			const user = await this.authRepository.findByUsername(username);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const passwordMatch = await bcrypt.compare(
				password_hash,
				user!.password_hash,
			);

			if (!passwordMatch) {
				return res.status(401).json({ error: "Invalid credentials" });
			}

			// @ts-ignore
			const token: any = jwt.sign(
				{ id: user?.id, username: user?.username, email: user?.email },
				config.jwtSecret,
				{
					expiresIn: config.jwtExpiresIn,
				},
			);

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 900000,
			});

			return res.status(200).json({ success: true, data: { token, user } });
		} catch (error: any) {
			return res.status(400).json({ success: false, error: error.message });
		}
	};
}

export default AuthController;

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";
import { User } from "../models/user.model.ts";

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies["token"];

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "No token, authorization denied" });
	}

	try {
		(req as any).user = jwt.verify(token, config.jwtSecret) as User;
		next();
	} catch (err) {
		res.clearCookie("token");
		res.status(403).json({ message: "Token is not valid" });
	}
};

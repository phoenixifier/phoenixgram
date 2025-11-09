import express from "express";
import AuthController from "../controllers/auth.controller.ts";

const authRouter = express.Router();
const authController: AuthController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;

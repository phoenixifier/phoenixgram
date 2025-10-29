import { Router } from "express";
import UserController from "../controllers/user.controller.ts";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);

export default userRouter;

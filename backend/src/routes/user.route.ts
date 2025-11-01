import { Router } from "express";
import UserController from "../controllers/user.controller.ts";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;

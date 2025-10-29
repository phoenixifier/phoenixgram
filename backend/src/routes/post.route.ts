import { Router } from "express";
import PostController from "../controllers/post.controller";

const postRouter = Router();
const postController: PostController = new PostController();

postRouter.get("/", postController.getPosts);

export default postRouter;

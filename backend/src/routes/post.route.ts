import { Router } from "express";
import PostController from "../controllers/post.controller";

const postRouter = Router();
const postController: PostController = new PostController();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);
postRouter.post("/", postController.createPost);
postRouter.patch("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;

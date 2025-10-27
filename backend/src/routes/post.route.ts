import { Router } from "express";
import { getPosts } from "../controllers/post.controller";

const router = Router();

router.post("/", getPosts);

export default router;

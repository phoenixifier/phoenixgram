import express, { Express } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import config from "./config/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route.ts";
import authRouter from "./routes/auth.route.ts";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(errorMiddleware);
app.use(cookieParser());

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(config.port, () => {
	console.log(`Server running on port: ${config.port}`);
});

export default app;

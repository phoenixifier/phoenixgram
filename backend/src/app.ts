import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import config from "./config/config";
import cors from "cors";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route.ts";

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorMiddleware);

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(config.port, () => {
	console.log(`Server running on port: ${config.port}`);
});

export default app;

import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import config from "./config/config";

const app = express();

app.use(express.json());
app.use(errorHandler);

app.listen(config.port, () => {
	console.log(`Server running on port: ${config.port}`);
});

export default app;

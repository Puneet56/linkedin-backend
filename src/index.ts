import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);

const server = app.listen(5000, () =>
	console.log(`
🚀 Server ready at: http://localhost:5000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);

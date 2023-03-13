import express from "express";
import morgan from "morgan";
import { userRouter } from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRouter);

export default app;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./controllers/errorController";
import { todoRouter } from "./routes/todoRoutes";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;

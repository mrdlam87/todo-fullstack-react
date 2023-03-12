import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from 'morgan'
import errorMiddleware from './middleware/error.middleware.js'


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(errorMiddleware);
app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.send("API running");
});

import authRoutes from './routes/auth.routes.js'

app.use("/api/auth", authRoutes);

export default app;
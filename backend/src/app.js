import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from 'morgan'
import errorMiddleware from './middleware/error.middleware.js'


dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ORIGIN
}));

app.use(express.json());
app.use(errorMiddleware);
app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.send("API running");
});

import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

export default app;
import express from "express";

import {
    createPost,
    getFeed,
    likePost,
    addComment
} from "../controllers/post.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);

router.get("/", getFeed);

router.put("/:id/like", protect, likePost);

router.post("/:id/comment", protect, addComment);

export default router;
import express from "express";

import {
    createPost,
    getFeed,
    likePost,
    addComment,
    getPost,
    deleteComment,
    deletePost
} from "../controllers/post.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);

router.get("/", protect, getFeed);

router.get("/:id", protect, getPost);

router.delete("/:id", protect, deletePost);

router.put("/:id/like", protect, likePost);

router.post("/:id/comment", protect, addComment);

router.patch("/:postId/comment/:commentId", protect, deleteComment);

export default router;
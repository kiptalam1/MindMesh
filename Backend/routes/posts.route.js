import express from "express";

import {
	createPost,
	getAllPosts,
	updatePost,
	deletePost,
	getSinglePost,
} from "../controllers/posts.controller.js";

import {
	createComment,
	getCommentsByPost,
} from "../controllers/comment.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// post routes;
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.post("/", authenticateToken, upload.single("image"), createPost);
router.put("/:id", authenticateToken, upload.single("image"), updatePost);
router.delete("/:id", authenticateToken, deletePost);

// --- Comment routes nested under posts ---
router.post("/:postId/comments", authenticateToken, createComment);
router.get("/:postId/comments", getCommentsByPost);



export default router;

import express from "express";

import {
	createPost,
	getAllPosts,
	updatePost,
	deletePost,
} from "../controllers/posts.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// post routes;
router.get("/", getAllPosts);
router.post("/", authenticateToken, createPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

export default router;

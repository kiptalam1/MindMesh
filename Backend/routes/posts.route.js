import express from "express";

import { createPost, getAllPosts } from "../controllers/posts.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// get all posts;
router.get("/", getAllPosts);
router.post("/", authenticateToken, createPost);

export default router;

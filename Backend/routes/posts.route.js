import express from "express";

import { getAllPosts } from "../controllers/posts.controller.js";

const router = express.Router();

// get all posts;
router.get("/", getAllPosts);

export default router;

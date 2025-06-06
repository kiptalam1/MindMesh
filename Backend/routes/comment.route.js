import express from "express";
import {
	createComment,
	deleteComment,
	getCommentsByPost,
	updateComment,
} from "../controllers/comment.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

//comments routes;
router.post("/:postId/comments", authenticateToken, createComment);
router.get("/:postId/comments", getCommentsByPost);
router.put("/comments/:commentId", authenticateToken, updateComment);
router.delete("/comments/:commentId", authenticateToken, deleteComment);

export default router;

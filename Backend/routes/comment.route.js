import express from "express";
import {
	getAllComments,
	createComment,
	deleteComment,
	getCommentsByPost,
	updateComment,
} from "../controllers/comment.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

//comments routes;
router.get("/comments", getAllComments);
router.post("/:postId/comments", authenticateToken, createComment);
router.get("/:postId/comments", getCommentsByPost);

// router.get("/:postId([0-9a-fA-F]{24})/comments", getCommentsByPost);

router.put("/comments/:commentId", authenticateToken, updateComment);
router.delete("/comments/:commentId", authenticateToken, deleteComment);

export default router;

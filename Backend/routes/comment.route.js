import express from "express";
import {
	createComment,
	deleteComment,
	getCommentsByPost,
	updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

//comments routes;
router.post("/:postId/comments", createComment);
router.get("/:postId/comments", getCommentsByPost);
router.put("/comments/:commentId", updateComment);
router.delete("/comments/:commentId", deleteComment);

export default router;

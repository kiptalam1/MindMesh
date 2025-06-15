import express from "express";
import {
	getAllComments,
	deleteComment,
	updateComment,
} from "../controllers/comment.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

//comments routes;

router.get("/", getAllComments);
router.delete("/:commentId", authenticateToken, deleteComment);
router.put("/:commentId", authenticateToken, updateComment);


export default router;

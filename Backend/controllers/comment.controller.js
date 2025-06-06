import Comment from "../models/comment.model.js";

// create a comment for a post;
export async function createComment(req, res) {
	try {
		const { content } = req.body;
		const { postId } = req.params;
		if (!postId) return res.status(400).json({ error: "Post ID required" });
		const author = req.user.id;
		if (!content) return res.status(400).json({ error: "Content required" });
		// save comment to database;
		const newComment = new Comment({ content, postId, author });
		await newComment.save();

		res.status(201).json({ success: true, data: newComment });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

// get comments by post;
export async function getCommentsByPost(req, res) {
	try {
		const { postId } = req.params;

		const comments = await Comment.find({ postId })
			.populate("author", "username")
			.sort({ createdAt: -1 });
		res.status(200).json({ success: true, data: comments });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

// DELETE comment
export async function deleteComment(req, res) {
  try {
		const { commentId } = req.params;
		const userId = req.user.id;
		const isAdmin = req.user.role === "admin";

		const comment = await Comment.findById(commentId);

		if (!comment) {
			return res
				.status(404)
				.json({ success: false, message: "Comment not found" });
		}

		if (comment.author.toString() !== userId && !isAdmin) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to delete this comment",
			});
		}
		// If the user is authorized, delete the comment
		await Comment.findByIdAndDelete(commentId);

		res.status(200).json({ success: true, message: "Comment deleted" });
	} catch (err) {
		res.status(500).json({ success: false, message: "Server error" });
	}
}

// update a comment;
export const updateComment = async (req, res) => {
	try {
		const { commentId } = req.params;
		const { content } = req.body;

		if (!content) {
			return res
				.status(400)
				.json({ success: false, message: "Content is required" });
		}

		const updatedComment = await Comment.findByIdAndUpdate(
			commentId,
			{ content },
			{ new: true }
		);

		if (!updatedComment) {
			return res
				.status(404)
				.json({ success: false, message: "Comment not found" });
		}

		res.status(200).json({
			success: true,
			message: "Comment updated successfully",
			data: updatedComment,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};
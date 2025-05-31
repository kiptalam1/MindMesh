import Comment from "../models/comment.model.js";

// create a comment for a post;
export async function createComment(req, res) {
	try {
		const { content, postId, author } = req.body;

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

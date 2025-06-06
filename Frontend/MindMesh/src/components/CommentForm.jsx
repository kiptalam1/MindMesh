import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/CommentForm.css";

const CommentForm = ({ postId, onCommentAdded }) => {
	const [content, setContent] = useState("");
	const { isAuthenticated, token } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting comment:", content);
		// Check if the user is authenticated;
		if (!isAuthenticated) return;

		try {
			const response = await fetch(`/api/posts/${postId}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content }),
			});

			const data = await response.json();

			if (data.success) {
				// Reset the comment input field;
				setContent("");
				// Call the callback function to notify parent component;
				onCommentAdded(data.data);
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
		}
	};

	if (!isAuthenticated) {
		return (
			<div className="comment-section">
				<p>Please log in to add a comment.</p>
			</div>
		);
	}
	return (
		<form className="comment-form" onSubmit={handleSubmit}>
			<textarea
				className="comment-input"
				placeholder="Write a comment..."
				required
				value={content}
				onChange={(e) => setContent(e.target.value)}
				name="comment"></textarea>
			<div>
				<button
					type="button"
					className="comment-reset"
					onClick={() => setContent("")}>
					Reset
				</button>
				<button type="submit" className="comment-submit">
					Submit
				</button>
			</div>
		</form>
	);
};

export default CommentForm;

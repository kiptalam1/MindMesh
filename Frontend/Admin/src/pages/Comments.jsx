import React, { useState, useEffect } from "react";
import { deleteComment, fetchAllComments } from "../utils/comments.js";
import "../styles/Comments.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Comments = () => {
	const [comments, setComments] = useState([]);
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(null);

	const { token } = useAuth();
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const data = await fetchAllComments();

				setComments(data.data);
				setMessage(data.message);
				setSuccess(data.success);
			} catch (error) {
				console.error("Error fetching comments", error);
				setSuccess(false);
				setMessage("Failed to fetch comments");
			}
		};
		fetchComments();
	}, []);

	const handleDelete = async (id) => {
		try {
			const res = await deleteComment(id, token);
			if (res.success) {
				setComments((prev) => prev.filter((comment) => comment._id !== id));
				setSuccess(res.success);
				setMessage(res.message);
			} else {
				setSuccess(false);
				setMessage(res.message);
			}
		} catch (error) {
			console.error("Error fetching comments", error);
			setSuccess(false);
			setMessage("Delete failed");
		}
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<div className="comments-page">
			<h1>All Comments</h1>
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}

			{success && comments.length === 0 && <p>No comments found.</p>}
			{comments.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Comment ID</th>
							<th>Post</th>
							<th>Comment</th>
							<th>Author</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{comments.map((comment) => (
							<tr key={comment._id}>
								<td>{comment._id}</td>
								<td>{comment.postId?.title || comment.postId || "N/A"}</td>

								<td>{comment.content}</td>
								<td>
									{comment.author?.username || comment.author || "Unknown"}
								</td>
								<td>{new Date(comment.createdAt).toLocaleString()}</td>
								<td>
									<div className="act-buttons">
										<button
											type="button"
											className="delete-btn"
											onClick={() => handleDelete(comment._id)}>
											<RiDeleteBinLine />
										</button>

										<button type="button" className="update-btn">
											<FaRegEdit />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Comments;

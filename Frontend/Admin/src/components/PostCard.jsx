import stripTags from "striptags";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import "../styles/PostCard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { adminApiFetch } from "../utils/api.js";

const PostCard = ({ post, onPostDelete }) => {
	const formattedDate = new Date(post.createdAt).toLocaleDateString();
	const { token } = useAuth();

	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(null);

	// Auto-clear message
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	const handleDelete = async () => {
		try {
			const res = await adminApiFetch(`/api/posts/${post._id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Failed to delete post");
			}

			onPostDelete(post._id);
			setSuccess(true);
			setMessage(data.message || "Post deleted successfully.");
		} catch (error) {
			console.error("Error deleting post:", error);
			setSuccess(false);
			setMessage(error.message || "Failed to delete post.");
		}
	};

	// update post;
	const navigate = useNavigate();
	const handleEdit = () => {
		navigate(`/dashboard/posts/edit/${post._id}`);
	};

	return (
		<div className="post-card">
			{/* display messages */}
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}

			<img src={post.imageUrl} alt={post.title} />
			<div className="post-info">
				<h2>{post.title}</h2>
				<span className="post-meta">
					By {post.author?.username || "Unknown"} · {formattedDate}
				</span>
				<p>{stripTags(post.content).slice(0, 100)}...</p>

				<a href={`/dashboard/posts/${post._id}`}>Read more...</a>
			</div>
			<div className="act-buttons">
				<button type="button" className="update-btn" onClick={handleEdit}>
					<FaRegEdit />
				</button>
				<button type="button" className="delete-btn" onClick={handleDelete}>
					<RiDeleteBinLine />
				</button>
			</div>
		</div>
	);
};

export default PostCard;

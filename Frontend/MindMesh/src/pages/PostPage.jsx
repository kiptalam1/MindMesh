import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostPage.css";
import CommentForm from "../components/CommentForm";
import { fetchCommentsByPost } from "../utils/comments.js";

const PostPage = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`/api/posts/${postId}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setPost(data.data);
			} catch (error) {
				console.error("Error fetching post:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [postId]);

	// fetch all comments by post;
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const comments = await fetchCommentsByPost(postId);
				setComments(comments);
			} catch (error) {
				console.error("Error fetching comments", error);
			}
		};
		fetchComments();
	}, [postId]);

	return (
		<div className="post-page">
			{loading && <p className="loading">Loading...</p>}
			{!post && !loading && <p>Post not found</p>}
			{post && (
				<>
					<h1>{post.title}</h1>
					<img src={post.imageUrl} alt={post.title} />
					<span>
						Written by {post.author?.username} on{" "}
						{new Date(post.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
					<p>{post.content}</p>
					<div className="comments-section">
						<h2>Comments</h2>
						{comments.length === 0 ? (
							<p>No comments yet</p>
						) : (
							<ul>
								{comments.map((comment) => (
									<li key={comment._id}>
										<strong>
											~{comment.author?.username || "Anonymous"}:{" "}
										</strong>
										{comment.content}
									</li>
								))}
							</ul>
						)}
					</div>
				</>
			)}

			{/* comments section */}
			<CommentForm
				postId={postId}
				onCommentAdded={(newComment) =>
					setComments((prev) => [newComment, ...prev])
				}
			/>
		</div>
	);
};

export default PostPage;

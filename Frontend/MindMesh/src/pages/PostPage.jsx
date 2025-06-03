import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostPage.css";

const PostPage = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);
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
				setLoading(false);
			} catch (error) {
				console.error("Error fetching post:", error);
				setLoading(false);
			}
		};
		fetchPost();
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
				</>
			)}
		</div>
	);
};

export default PostPage;

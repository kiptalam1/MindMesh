import React, { useState, useEffect } from "react";
import stripTags from "striptags";

import { useNavigate, useParams } from "react-router-dom";
import "../styles/Post.css";

const Post = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSinglePost = async () => {
			try {
				// fetch post from the api;
				const response = await fetch(`/api/posts/${postId}`);
				// check if response is okay before parsing json;
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				// check the content type;
				const contentType = response.headers.get("content-type");

				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("Server returned non-JSON response");
				}

				const data = await response.json();

				setPost(data.data);
				setMessage(data.message);
				setSuccess(data.success);
				setLoading(false);

				// catch errors;
			} catch (error) {
				console.error("Error fetching post", error);
				setLoading(false);
				setSuccess(false);
				setMessage(error.message || "Failed to fetch post.");
			}
		};
		fetchSinglePost();
	}, [postId]);

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [message, success]);
	return (
		<div className="post">
			{/* Back button */}
			<button
				onClick={() => navigate("/dashboard/posts")}
				className="back-button">
				← Back to Posts
			</button>
			{/*  handle message display; */}
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}
			{/* display post */}
			{loading ? (
				<div className="loading">loading...</div>
			) : post ? (
				<>
					<h1>{post.title}</h1>
					<img src={post.imageUrl} alt={post.title} />
					<span>
						Written by {post.author?.username} on{" "}
						{new Date(post.createdAt).toLocaleString("en-US", {
							dateStyle: "long",
						})}
					</span>
					<p>{stripTags(post.content)}</p>
				</>
			) : (
				<div>No posts found</div>
			)}
		</div>
	);
};

export default Post;

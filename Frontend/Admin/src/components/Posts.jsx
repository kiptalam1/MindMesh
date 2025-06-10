import React from "react";
import PostCard from "./PostCard";
import "../styles/Posts.css";

const Posts = () => {
	const [posts, setPosts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [message, setMessage] = React.useState(null);
	const [success, setSuccess] = React.useState(false);
	// Fetch posts from the API
	React.useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const response = await fetch("/api/posts");

				// Check if response is ok before parsing JSON
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				// Check content type
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("Server returned non-JSON response");
				}

				const data = await response.json();

				setPosts(data.data);
				setMessage(data.message);
				setSuccess(data.success);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching posts:", error);
				setSuccess(false);
				setLoading(false);
				setMessage(error.message || "Failed to fetch posts!");
			}
		};
		fetchAllPosts();
	}, []);

	React.useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<div className="posts">
			{/*  handle message display; */}
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}

			{/* display the posts */}
			{loading ? (
				<div className="loading">loading...</div>
			) : posts.length > 0 ? (
				posts.map((post) => <PostCard key={post._id} post={post} />)
			) : (
				<div>No posts found</div>
			)}
		</div>
	);
};

export default Posts;

import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import "../styles/PostsPage.css";
import { apiFetch } from "../utils/api.js";

const PostsPage = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const results = await apiFetch("/api/posts");
				const data = await results.json();
				setPosts(data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching posts:", error);
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className="posts-page">
			{loading ? (
				<div className="loading">loading...</div>
			) : (
				<div className="posts-list">
					{posts.map((post) => (
						<PostCard key={post._id} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default PostsPage;

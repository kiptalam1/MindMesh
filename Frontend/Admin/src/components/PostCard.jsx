import "../styles/PostCard.css";

const PostCard = ({ post }) => {
	const formattedDate = new Date(post.createdAt).toLocaleDateString();

	return (
		<div className="post-card">
			<img src={post.imageUrl} alt={post.title} />
			<div className="post-info">
				<h2>{post.title}</h2>
				<span className="post-meta">
					By {post.author?.username || "Unknown"} · {formattedDate}
				</span>
				<p>{post.content.slice(0, 100)}...</p>
				<a href={`/posts/${post._id}`}>Read more...</a>
			</div>
		</div>
	);
};

export default PostCard;
